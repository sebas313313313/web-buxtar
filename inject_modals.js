const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src/pages');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Change raw button colors to brand-vino
  const bgRegex = /className=["']([^"']*)bg-(cafe-vino|indigo|blue)-600([^"']*)["']/g;
  if(content.match(bgRegex)) {
    // Only if it's on a button (approximate by just changing all indigo/blue inside this file if it's a known form, but better only on buttons)
    // Actually, let's just globally replace strict indigo-600 because indigo isn't a brand color.
    if(content.includes('bg-indigo-600')) {
      content = content.replace(/bg-indigo-600/g, 'bg-brand-vino');
      content = content.replace(/hover:bg-indigo-700/g, 'hover:opacity-90');
      content = content.replace(/focus:ring-indigo-500/g, 'focus:ring-brand-vino/50');
      content = content.replace(/text-indigo-600/g, 'text-brand-vino');
      changed = true;
    }
    if(content.includes('bg-blue-600')) {
      content = content.replace(/bg-blue-600/g, 'bg-brand-vino');
      content = content.replace(/hover:bg-blue-700/g, 'hover:opacity-90');
      content = content.replace(/focus:ring-blue-500/g, 'focus:ring-brand-vino/50');
      changed = true;
    }
    // For cafe-vino, we should only replace it if it's used as a background for interactive elements if needed, but the Button component was already fixed.
  }

  // Handle the modal injection if the file manages forms (has form, inputs, or handle save logic)
  const hasFormModal = content.includes('showFormModal') || content.includes('setShowFormModal') || content.includes('handleSubmit') || content.includes('handleCreate');
  const hasActionModalHooked = content.includes('showSuccessModal') || content.includes('setShowSuccessModal');
  
  if (hasFormModal && !hasActionModalHooked) {
    changed = true;
    
    // Import ActionModal if not present
    if (!content.includes('ActionModal') && content.includes('import')) {
      // Find where components are imported from '../../components' or '../components'
      if (content.includes('from \'../../components\'')) {
        content = content.replace(/from '\.\.\/\.\.\/components';/, `, ActionModal } from '../../components';`);
        content = content.replace(/}\s*,\s*ActionModal/, ', ActionModal }'); // Fix any duplicate braces
      } else if (content.includes('from \'../components\'')) {
        content = content.replace(/from '\.\.\/components';/, `, ActionModal } from '../components';`);
        content = content.replace(/}\s*,\s*ActionModal/, ', ActionModal }'); 
      }
    }

    // Identify where useState logic is
    const useStateRegex = /const \[.*?\] = useState\(.*?\);/g;
    let match;
    let lastUseStateIndex = -1;
    while ((match = useStateRegex.exec(content)) !== null) {
      lastUseStateIndex = match.index + match[0].length;
    }

    if (lastUseStateIndex !== -1) {
      content = content.slice(0, lastUseStateIndex) + '\n  const [showSuccessModal, setShowSuccessModal] = useState(false);' + content.slice(lastUseStateIndex);
    }

    // Replace alert() with modal if present
    if (content.includes('alert(')) {
      content = content.replace(/alert\([^)]+\);/g, 'setShowSuccessModal(true);');
    }

    // Hook onto setShowFormModal(false) -> setShowSuccessModal(true)
    if (content.includes('setShowFormModal(false)')) {
      content = content.replace(/setShowFormModal\(false\);/g, 'setShowFormModal(false);\n    setShowSuccessModal(true);');
    } else if (content.includes('handleSubmit =')) {
        // Find end of handleSubmit
    }

    // Add ActionModal component at the end of the return statement
    // We'll append it before the final </div>
    const returnRegex = /return \([\s\S]*?(<\/div>)\s*\);\s*};/g;
    const match2 = returnRegex.exec(content);
    if (content.lastIndexOf('</div>\n  );\n}') !== -1 || content.lastIndexOf('</div>\n  );\n};') !== -1 || content.lastIndexOf('</div>\n    </div>\n  );\n};') !== -1) {
       const modalStr = `
      <ActionModal 
        isOpen={showSuccessModal} 
        icon="success" 
        title="Completado" 
        description="La operación se realizó satisfactoriamente." 
        actionColor="success" 
        actionText="Aceptar" 
        showCloseButton={false} 
        cancelText="" 
        onClose={() => setShowSuccessModal(false)} 
        onAction={() => setShowSuccessModal(false)} 
      />
    `;
       const lastDivIdx = content.lastIndexOf('</div>');
       content = content.slice(0, lastDivIdx) + modalStr + content.slice(lastDivIdx);
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Processed', file);
  }
});
