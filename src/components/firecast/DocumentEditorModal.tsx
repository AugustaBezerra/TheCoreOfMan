import React, { useState, useEffect, useRef } from 'react';
import { FirecastItem } from '../../types/firecast';
import { updateLibraryItem } from '../../services/firecastLibraryService';

interface DocumentEditorModalProps {
  isOpen: boolean;
  item: FirecastItem | null;
  allItems?: FirecastItem[];
  isGM: boolean;
  onClose: () => void;
  onSave: (docId: string, updated: Partial<FirecastItem>) => void;
  onSelectDoc?: (docItem: FirecastItem) => void;
  onCreateNewDoc?: () => void;
}

const COLOR_PALETTE = [
  { name: 'Ciano Éter', hex: '#38bdf8', preview: 'bg-sky-400' },
  { name: 'Coral Laranja', hex: '#fb923c', preview: 'bg-orange-400' },
  { name: 'Dourado Cerne', hex: '#f59e0b', preview: 'bg-amber-500' },
  { name: 'Branco Puro', hex: '#ffffff', preview: 'bg-white' },
  { name: 'Esmeralda', hex: '#34d399', preview: 'bg-emerald-400' },
  { name: 'Púrpura Místico', hex: '#c084fc', preview: 'bg-purple-400' },
  { name: 'Carmesim', hex: '#f87171', preview: 'bg-red-400' },
  { name: 'Prata Éter', hex: '#cbd5e1', preview: 'bg-slate-300' },
];

const IMAGE_PRESETS = [
  { label: 'Banner Criatura do Vácuo', url: './art/banner-top.webp', icon: '🐉' },
  { label: 'Retrato de Marie Doro', url: './art/journey.webp', icon: '👤' },
  { label: 'Astrolábio Celestial', url: './art/radial-compass.webp', icon: '🧭' },
  { label: 'Carta Náutica Antiga', url: './art/parchment-center.webp', icon: '🗺️' },
  { label: 'Arquivo Astral / Biblioteca', url: './art/library.webp', icon: '📖' },
  { label: 'Emblema do Cerne', url: './art/emblem.webp', icon: '💎' },
  { label: 'Pergaminho de Pistas', url: './art/page-bg.webp', icon: '📜' },
];

export const DocumentEditorModal: React.FC<DocumentEditorModalProps> = ({
  isOpen,
  item,
  allItems = [],
  isGM,
  onClose,
  onSave,
  onSelectDoc,
  onCreateNewDoc,
}) => {
  // Lista de abas abertas no estilo Firecast (Mesa, 01 - Informações, Ash & Root...)
  const [openDocIds, setOpenDocIds] = useState<string[]>([]);
  const [activeDocId, setActiveDocId] = useState<string>('');

  const [currentDocName, setCurrentDocName] = useState('');
  const [isVisibleToPlayers, setIsVisibleToPlayers] = useState(false);
  const [selectedFont, setSelectedFont] = useState('Segoe UI');
  const [selectedSize, setSelectedSize] = useState('18');
  const [currentColor, setCurrentColor] = useState('#ffffff');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isTextMode, setIsTextMode] = useState(false);
  const [textContent, setTextContent] = useState('');

  // Modal para inserir imagens
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [imageAlignment, setImageAlignment] = useState<'center' | 'banner' | 'left'>('center');

  const editorRef = useRef<HTMLDivElement | null>(null);

  // Sincronizar abas abertas
  useEffect(() => {
    if (item && item.type === 'document') {
      setActiveDocId(item.id);
      setOpenDocIds((prev) => (prev.includes(item.id) ? prev : [...prev, item.id]));
    }
  }, [item]);

  // Carregar conteúdo do documento ativo
  const activeDoc = (allItems.find((d) => d.id === activeDocId) || item) as FirecastItem | undefined;

  const loadContentIntoEditor = (htmlContent: string) => {
    if (editorRef.current) {
      if (htmlContent.includes('<p>') || htmlContent.includes('<div>') || htmlContent.includes('<img') || htmlContent.includes('<h')) {
        editorRef.current.innerHTML = htmlContent;
      } else if (htmlContent.trim()) {
        editorRef.current.innerHTML = htmlContent
          .split('\n\n')
          .map((p) => `<p style="margin-bottom: 12px; font-size: 1.05em; line-height: 1.7;">${p.replace(/\n/g, '<br>')}</p>`)
          .join('');
      } else {
        editorRef.current.innerHTML = '<p style="color: #94a3b8; font-style: italic;">Clique aqui para começar a escrever seu arquivo, formatar títulos e adicionar ilustrações...</p>';
      }
    }
  };

  const setEditorRef = (node: HTMLDivElement | null) => {
    editorRef.current = node;
    if (node && activeDoc) {
      loadContentIntoEditor(activeDoc.documentContent || '');
    }
  };

  useEffect(() => {
    if (activeDoc) {
      setCurrentDocName(activeDoc.name || '');
      setIsVisibleToPlayers(activeDoc.isVisibleToPlayers ?? false);
      const raw = activeDoc.documentContent || '';
      setTextContent(raw);
      loadContentIntoEditor(raw);
    }
  }, [activeDocId, activeDoc?.id]);

  if (!isOpen || !activeDoc) return null;

  // Executar comandos de formatação preservando a seleção
  const executeCommand = (command: string, value: string | undefined = undefined) => {
    if (!isGM) return;
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleApplyColor = (colorHex: string) => {
    setCurrentColor(colorHex);
    executeCommand('foreColor', colorHex);
  };

  const handleApplyFont = (fontName: string) => {
    setSelectedFont(fontName);
    executeCommand('fontName', fontName);
  };

  const handleInsertHeading = (colorHex: string, label: string) => {
    const html = `<h2 style="color: ${colorHex}; font-size: 1.6em; font-weight: 800; margin-top: 24px; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px;">${label}</h2><p><br></p>`;
    executeCommand('insertHTML', html);
  };

  const handleInsertQuote = () => {
    const html = `
      <div style="text-align: center; margin: 24px auto; padding: 18px 20px; border-top: 2px solid #64748b; border-bottom: 2px solid #64748b; font-style: italic; color: #f8fafc; font-size: 1.15em; background: rgba(0,0,0,0.3); border-radius: 12px;">
        <p style="margin: 0; font-weight: bold; color: #fef08a;">"Para cada vida salva, outra se inclina à morte. A balança está sempre de pé."</p>
        <span style="font-size: 0.9em; color: #94a3b8; display: block; margin-top: 8px;">Inscrição no interior da loja Ash & Root</span>
      </div>
      <p><br></p>
    `;
    executeCommand('insertHTML', html);
  };

  const handleInsertDivider = () => {
    executeCommand('insertHorizontalRule');
  };

  const handleInsertImageCommit = (url: string) => {
    if (!url) return;
    let html = '';
    if (imageAlignment === 'banner') {
      html = `
        <div style="text-align: center; margin: 20px auto 28px;">
          <img src="${url}" alt="Ilustração" style="max-width: 100%; width: 100%; max-height: 440px; object-fit: cover; border-radius: 14px; border: 2px solid #f59e0b; box-shadow: 0 12px 35px rgba(0,0,0,0.8); display: block;" />
        </div>
        <p><br></p>
      `;
    } else {
      html = `
        <div style="text-align: center; margin: 20px auto;">
          <img src="${url}" alt="Ilustração" style="max-width: 420px; width: 100%; border-radius: 14px; border: 2px solid #64748b; box-shadow: 0 10px 30px rgba(0,0,0,0.7); display: inline-block;" />
          <p style="font-weight: bold; font-size: 1.1em; color: #ffffff; margin-top: 10px;">Legenda da Imagem</p>
        </div>
        <p><br></p>
      `;
    }
    executeCommand('insertHTML', html);
    setShowImageDialog(false);
    setCustomImageUrl('');
  };

  const handleSave = () => {
    if (!activeDoc) return;
    const contentHtml = isTextMode 
      ? textContent 
      : (editorRef.current ? editorRef.current.innerHTML : activeDoc.documentContent || '');

    // 1. Gravar imediatamente no localStorage
    updateLibraryItem(activeDoc.id, {
      name: currentDocName.trim() || activeDoc.name,
      documentContent: contentHtml,
      isVisibleToPlayers,
    });

    // 2. Chamar prop onSave com id do documento ativo
    onSave(activeDoc.id, {
      name: currentDocName.trim() || activeDoc.name,
      documentContent: contentHtml,
      isVisibleToPlayers,
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleSelectTab = (doc: FirecastItem) => {
    if (activeDoc) {
      const currentHtml = isTextMode ? textContent : (editorRef.current ? editorRef.current.innerHTML : activeDoc.documentContent || '');
      updateLibraryItem(activeDoc.id, {
        name: currentDocName.trim() || activeDoc.name,
        documentContent: currentHtml,
        isVisibleToPlayers,
      });
    }
    setActiveDocId(doc.id);
    if (onSelectDoc) onSelectDoc(doc);
  };

  const handleCloseTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const remaining = openDocIds.filter((id) => id !== tabId);
    setOpenDocIds(remaining);
    if (remaining.length === 0) {
      onClose();
    } else if (activeDocId === tabId) {
      setActiveDocId(remaining[remaining.length - 1]);
    }
  };

  // Documentos abertos correspondentes
  const openDocs = openDocIds
    .map((id) => allItems.find((d) => d.id === id))
    .filter((d): d is FirecastItem => Boolean(d));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn select-none overflow-hidden">
      <div 
        className="relative w-full max-w-6xl h-[92vh] bg-[#141620] border-2 border-stone-800 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden text-stone-100 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* BARRA SUPERIOR DE ABAS (Estilo Firecast PC - Imagem 2) */}
        <div className="bg-[#0e0f17] border-b-2 border-stone-800 flex items-center justify-between px-3 pt-2 select-none overflow-x-auto">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {openDocs.map((doc) => {
              const isActive = doc.id === activeDocId;
              const isLocked = !doc.isVisibleToPlayers;
              return (
                <div
                  key={doc.id}
                  onClick={() => handleSelectTab(doc)}
                  className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-t-xl cursor-pointer text-sm sm:text-base font-bold transition-all ${
                    isActive
                      ? 'bg-[#1a1c29] text-white border-t-2 border-x-2 border-stone-700/80 shadow-md'
                      : 'bg-[#10121a] text-stone-400 hover:text-stone-200 hover:bg-[#151722]'
                  }`}
                >
                  <span className="text-base">{isLocked ? '🔒' : '📜'}</span>
                  <span className="truncate max-w-[150px] sm:max-w-[220px]">
                    {doc.name}
                  </span>

                  {/* Botão Fechar Aba ✕ */}
                  <button
                    type="button"
                    onClick={(e) => handleCloseTab(doc.id, e)}
                    className="w-5 h-5 rounded-md hover:bg-stone-700/80 text-stone-400 hover:text-white flex items-center justify-center text-xs font-bold transition-colors ml-1 cursor-pointer"
                  >
                    ✕
                  </button>

                  {/* Linha Indicadora Vermelha com Entalhe (Exatamente como no Firecast) */}
                  {isActive && (
                    <div className="absolute -bottom-[2px] left-0 right-0 h-[3px] bg-red-600 shadow-[0_0_10px_rgba(239,68,68,0.8)]">
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-red-600 rounded-t-sm" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Botão [+] Nova Aba / Novo Documento */}
            {isGM && onCreateNewDoc && (
              <button
                type="button"
                onClick={onCreateNewDoc}
                className="w-9 h-9 rounded-xl border border-stone-700 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center text-lg font-bold ml-1 transition-colors cursor-pointer"
                title="Criar novo arquivo na mesa"
              >
                +
              </button>
            )}
          </div>

          {/* Botões do Canto Direito da Janela */}
          <div className="flex items-center gap-2 pb-1">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center text-xl font-bold cursor-pointer transition-colors"
              title="Fechar janela de documento"
            >
              ✕
            </button>
          </div>
        </div>

        {/* BARRA DE TÍTULO & CONTROLE DA MESTRE */}
        <div className="p-3 sm:px-6 sm:py-3 bg-[#161824] border-b border-stone-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-[220px]">
            <span className="text-2xl text-amber-400">📜</span>
            {isGM ? (
              <input
                type="text"
                value={currentDocName}
                onChange={(e) => setCurrentDocName(e.target.value)}
                placeholder="Título do Arquivo..."
                className="w-full max-w-md px-3 py-1.5 bg-[#0a0b12] border-2 border-stone-700 focus:border-amber-400 rounded-xl text-lg sm:text-xl font-black text-white focus:outline-none"
              />
            ) : (
              <h2 className="text-xl sm:text-2xl font-black text-amber-200">
                {currentDocName}
              </h2>
            )}
          </div>

          {/* Visibilidade, Modo e Botão Salvar */}
          <div className="flex items-center gap-3">
            {isGM && (
              <button
                type="button"
                onClick={() => {
                  if (!isTextMode) {
                    setTextContent(editorRef.current ? editorRef.current.innerHTML : activeDoc.documentContent || '');
                    setIsTextMode(true);
                  } else {
                    setIsTextMode(false);
                    setTimeout(() => {
                      loadContentIntoEditor(textContent);
                    }, 50);
                  }
                }}
                className="px-3.5 py-2 rounded-xl border-2 border-stone-600 bg-stone-900 hover:bg-stone-800 text-stone-200 text-sm sm:text-base font-bold flex items-center gap-1.5 cursor-pointer shadow"
                title={isTextMode ? 'Mudar para Editor Visual WYSIWYG' : 'Mudar para Editor de Texto / Código Puro'}
              >
                <span>{isTextMode ? '🎨 Modo Visual' : '📝 Modo Texto'}</span>
              </button>
            )}

            {isGM && (
              <button
                type="button"
                onClick={() => setIsVisibleToPlayers(!isVisibleToPlayers)}
                className={`px-3.5 py-2 rounded-xl border-2 text-sm sm:text-base font-bold flex items-center gap-2 cursor-pointer transition-all ${
                  isVisibleToPlayers
                    ? 'border-emerald-500 bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900/60'
                    : 'border-red-500 bg-red-950/60 text-red-200 hover:bg-red-900/60'
                }`}
                title={isVisibleToPlayers ? 'Visível para todos os jogadores' : 'Cadeado Vermelho: Apenas você pode ver'}
              >
                <span>{isVisibleToPlayers ? '👁️' : '🔒'}</span>
                <span>{isVisibleToPlayers ? 'Visível aos Jogadores' : 'Cadeado Vermelho'}</span>
              </button>
            )}

            {isGM && (
              <button
                type="button"
                onClick={handleSave}
                className="px-6 py-2 rounded-xl border-2 border-amber-400 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-black text-base shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>💾</span>
                <span>{saveSuccess ? '✓ Salvo!' : 'Salvar'}</span>
              </button>
            )}
          </div>
        </div>

        {/* BARRA DE FERRAMENTAS DO EDITOR (Estilo Firecast Desktop - Imagem 2) */}
        {isGM && (
          <div className="p-2 sm:px-4 bg-[#10121b] border-b-2 border-stone-800 flex flex-wrap items-center gap-2 text-sm sm:text-base font-bold select-none overflow-x-auto">
            
            {/* Seletor de Fonte */}
            <select
              value={selectedFont}
              onChange={(e) => handleApplyFont(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-stone-200 text-sm font-bold focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="Segoe UI">Segoe UI</option>
              <option value="sans-serif">Sans-Serif</option>
              <option value="Cinzel">Cinzel (Arcano)</option>
              <option value="Georgia">Georgia (Clássico)</option>
              <option value="Courier New">Monospace (Terminal)</option>
            </select>

            {/* Seletor de Tamanho da Fonte (Acessível) */}
            <select
              value={selectedSize}
              onChange={(e) => {
                setSelectedSize(e.target.value);
                executeCommand('fontSize', e.target.value === '16' ? '3' : e.target.value === '18' ? '4' : e.target.value === '22' ? '5' : '6');
              }}
              className="px-2.5 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-stone-200 text-sm font-bold focus:outline-none focus:border-amber-400 cursor-pointer"
              title="Tamanho do texto"
            >
              <option value="16">16px</option>
              <option value="18">18px (Padrão)</option>
              <option value="22">22px (Grande)</option>
              <option value="28">28px (Extra Grande)</option>
            </select>

            {/* Paleta de Cores Estilo Firecast */}
            <div className="flex items-center gap-1.5 px-2 py-1 bg-stone-900 rounded-lg border border-stone-700">
              {COLOR_PALETTE.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleApplyColor(c.hex);
                  }}
                  className={`w-5 h-5 rounded-md ${c.preview} border border-black/40 hover:scale-125 transition-transform cursor-pointer ${
                    currentColor === c.hex ? 'ring-2 ring-white scale-110' : ''
                  }`}
                  title={`Cor: ${c.name}`}
                />
              ))}
            </div>

            <div className="h-6 w-px bg-stone-700 mx-1 hidden sm:block" />

            {/* Botões de Formatação: B, I, U, S */}
            <div className="flex items-center gap-1 bg-stone-900 p-0.5 rounded-lg border border-stone-700">
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('bold'); }}
                className="w-8 h-8 rounded hover:bg-stone-800 text-white font-black text-base flex items-center justify-center cursor-pointer"
                title="Negrito (Ctrl+B)"
              >
                B
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('italic'); }}
                className="w-8 h-8 rounded hover:bg-stone-800 text-stone-200 italic font-serif text-base flex items-center justify-center cursor-pointer"
                title="Itálico (Ctrl+I)"
              >
                I
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('underline'); }}
                className="w-8 h-8 rounded hover:bg-stone-800 text-stone-200 underline text-base flex items-center justify-center cursor-pointer"
                title="Sublinhado (Ctrl+U)"
              >
                U
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('strikeThrough'); }}
                className="w-8 h-8 rounded hover:bg-stone-800 text-stone-200 line-through text-base flex items-center justify-center cursor-pointer"
                title="Tachado"
              >
                S
              </button>
            </div>

            {/* Alinhamento */}
            <div className="flex items-center gap-1 bg-stone-900 p-0.5 rounded-lg border border-stone-700">
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('justifyLeft'); }}
                className="w-8 h-8 rounded hover:bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center cursor-pointer"
                title="Alinhar à Esquerda"
              >
                ☰
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('justifyCenter'); }}
                className="w-8 h-8 rounded hover:bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center cursor-pointer"
                title="Centralizar"
              >
                ☵
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('justifyRight'); }}
                className="w-8 h-8 rounded hover:bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center cursor-pointer"
                title="Alinhar à Direita"
              >
                ☲
              </button>
            </div>

            <div className="h-6 w-px bg-stone-700 mx-1 hidden sm:block" />

            {/* Inserções Especiais: Títulos Rápidos, Imagens, Citações */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleInsertHeading('#fb923c', 'Título Coral');
                }}
                className="px-2.5 py-1 rounded-lg bg-orange-950/60 border border-orange-500/50 text-orange-200 hover:bg-orange-900 text-xs font-bold cursor-pointer"
                title="Inserir Título Coral (Estilo Imagem 2)"
              >
                H1 Coral
              </button>

              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleInsertHeading('#38bdf8', 'Subtítulo Ciano');
                }}
                className="px-2.5 py-1 rounded-lg bg-sky-950/60 border border-sky-500/50 text-sky-200 hover:bg-sky-900 text-xs font-bold cursor-pointer"
                title="Inserir Subtítulo Ciano (Estilo Imagem 2)"
              >
                H2 Ciano
              </button>

              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleInsertQuote();
                }}
                className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-700 text-amber-300 hover:text-white hover:bg-stone-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
                title="Inserir Citação Centralizada (Estilo Imagem 1)"
              >
                <span>❝</span> Citação
              </button>

              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleInsertDivider();
                }}
                className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-700 text-stone-300 hover:text-white hover:bg-stone-800 text-xs font-bold cursor-pointer"
                title="Inserir Linha Divisória"
              >
                ― Linha
              </button>

              {/* Botão Principal: Inserir Imagem 🖼️ */}
              <button
                type="button"
                onClick={() => setShowImageDialog(true)}
                className="px-3 py-1 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 font-black text-xs uppercase flex items-center gap-1.5 shadow hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title="Inserir Imagem ou Banner no Arquivo"
              >
                <span>🖼️</span> Inserir Imagem
              </button>

              {/* Desfazer / Refazer */}
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('undo'); }}
                className="w-8 h-8 rounded bg-stone-900 border border-stone-700 text-stone-300 hover:text-white flex items-center justify-center cursor-pointer"
                title="Desfazer (Ctrl+Z)"
              >
                ↩
              </button>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); executeCommand('redo'); }}
                className="w-8 h-8 rounded bg-stone-900 border border-stone-700 text-stone-300 hover:text-white flex items-center justify-center cursor-pointer"
                title="Refazer (Ctrl+Y)"
              >
                ↪
              </button>
            </div>

          </div>
        )}

        {/* ÁREA PRINCIPAL DO DOCUMENTO (Visual estendido tipo PC - Imagem 2) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#181a26] flex justify-center">
          <div className="w-full max-w-4xl bg-[#1e212f] rounded-2xl border-2 border-stone-800/90 shadow-2xl p-6 sm:p-12 min-h-full flex flex-col">
            
            {isTextMode ? (
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                readOnly={!isGM}
                style={{
                  fontFamily: selectedFont,
                  fontSize: `${selectedSize}px`,
                  color: currentColor,
                }}
                className="w-full flex-1 min-h-[480px] p-5 bg-black/60 border-2 border-amber-500/40 rounded-xl leading-relaxed focus:outline-none focus:border-amber-400 font-sans text-lg resize-none shadow-inner text-white"
                placeholder="Escreva ou edite seu texto livremente aqui..."
              />
            ) : (
              /* Folha Editável WYSIWYG */
              <div
                ref={setEditorRef}
                contentEditable={isGM}
                suppressContentEditableWarning
                style={{
                  fontFamily: selectedFont,
                  fontSize: `${selectedSize}px`,
                  color: currentColor,
                }}
                className={`flex-1 focus:outline-none min-h-[480px] leading-relaxed selection:bg-amber-500 selection:text-black ${
                  isGM ? 'cursor-text' : 'cursor-default'
                }`}
              />
            )}

          </div>
        </div>

        {/* DIÁLOGO: INSERIR IMAGEM (Presets + URL Livre) */}
        {showImageDialog && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
            <div 
              className="relative w-full max-w-2xl bg-[#12141e] border-2 border-amber-500 rounded-3xl shadow-[0_0_60px_rgba(245,158,11,0.5)] p-6 sm:p-8 text-stone-100 font-sans"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-6">
                <h3 className="text-2xl font-black text-amber-200 flex items-center gap-3">
                  <span>🖼️</span> Inserir Imagem no Arquivo
                </h3>
                <button
                  onClick={() => setShowImageDialog(false)}
                  className="w-10 h-10 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center text-xl font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Formato de Inserção */}
              <div className="mb-5">
                <label className="block text-sm font-black text-amber-300 uppercase tracking-wide mb-2">
                  Formato de Apresentação
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setImageAlignment('banner')}
                    className={`p-3 rounded-xl border-2 text-left font-bold transition-all cursor-pointer ${
                      imageAlignment === 'banner'
                        ? 'border-amber-400 bg-amber-950/70 text-white ring-2 ring-amber-400'
                        : 'border-stone-700 bg-stone-900 text-stone-300 hover:border-stone-500'
                    }`}
                  >
                    <span className="block text-base">🐉 Banner Panorâmico</span>
                    <span className="block text-xs font-normal text-stone-400 mt-1">
                      Ocupa toda a largura do texto (como na Imagem 2).
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setImageAlignment('center')}
                    className={`p-3 rounded-xl border-2 text-left font-bold transition-all cursor-pointer ${
                      imageAlignment === 'center'
                        ? 'border-amber-400 bg-amber-950/70 text-white ring-2 ring-amber-400'
                        : 'border-stone-700 bg-stone-900 text-stone-300 hover:border-stone-500'
                    }`}
                  >
                    <span className="block text-base">👤 Retrato Centralizado</span>
                    <span className="block text-xs font-normal text-stone-400 mt-1">
                      Com legenda abaixo (como Marie Doro na Imagem 1).
                    </span>
                  </button>
                </div>
              </div>

              {/* Presets Rápidos */}
              <div className="mb-5">
                <label className="block text-sm font-black text-amber-300 uppercase tracking-wide mb-2">
                  Escolha uma Ilustração do Universo:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {IMAGE_PRESETS.map((p) => (
                    <button
                      key={p.url}
                      type="button"
                      onClick={() => handleInsertImageCommit(p.url)}
                      className="p-3 rounded-xl border border-stone-700 bg-stone-900/90 hover:bg-stone-800 hover:border-amber-400 text-stone-200 hover:text-white text-left transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span className="text-2xl">{p.icon}</span>
                      <span className="text-xs font-bold truncate">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Colar Link / URL Customizada */}
              <div className="space-y-3">
                <label className="block text-sm font-black text-amber-300 uppercase tracking-wide">
                  Ou Cole o Link / URL da Imagem (Pinterest, Imgur, etc.):
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    placeholder="https://i.pinimg.com/... ou link direto da imagem"
                    className="flex-1 px-4 py-3 bg-[#0a0b12] border-2 border-stone-700 focus:border-amber-400 rounded-xl text-white text-base font-medium focus:outline-none"
                  />
                  <button
                    type="button"
                    disabled={!customImageUrl.trim()}
                    onClick={() => handleInsertImageCommit(customImageUrl.trim())}
                    className="px-6 py-3 rounded-xl border-2 border-amber-400 bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 font-black text-base shadow disabled:opacity-40 cursor-pointer"
                  >
                    Inserir
                  </button>
                </div>

                {customImageUrl && (
                  <div className="mt-3 p-3 bg-stone-950 rounded-xl border border-stone-800 flex items-center gap-4">
                    <img 
                      src={customImageUrl} 
                      alt="Prévia" 
                      className="w-16 h-16 object-cover rounded-lg border border-stone-700"
                      onError={(e) => { (e.target as HTMLImageElement).src = './art/journey.webp'; }}
                    />
                    <span className="text-xs font-bold text-stone-300">Prévia da imagem carregada</span>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
