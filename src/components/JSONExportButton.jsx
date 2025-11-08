import React from 'react';

// Komponenta pro stažení JSON dat
function JsonExportButton({ data, fileName }) {
  
    const exportDataToJson = () => {
        // Kontrola, zda jsou data platný objekt/pole (pro MDX)
        if (!data || (Array.isArray(data) && data.length === 0)) {
            console.warn("No data available for export.");
            return;
        }

        const jsonContent = JSON.stringify(data, null, 2); // Pěkné formátování

        // Vytvoření Blob objektu a odkazu pro stažení
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        // Zajištění, že název souboru je platný
        const safeFileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        a.download = safeFileName + '.json';
        
        // Simulace kliknutí pro stažení souboru
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
    };

    return (
        <div style={{ marginTop: '10px', marginBottom: '20px' }}>
            <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); exportDataToJson(); }} 
                style={{ fontSize: '0.9em' }}
            >
                Export in JSON
            </a>
        </div>
    );
}

// Umožní použití v MDX jako <JsonExportButton />
export default JsonExportButton;

/* Poznámka: Aby Docusaurus viděl tuto komponentu v MDX souborech,
   musíte ji globálně zaregistrovat pomocí Docusaurus swizzling/wrapping nebo
   ji importovat na začátku MDX souboru (což je lepší pro generovaný kód). */