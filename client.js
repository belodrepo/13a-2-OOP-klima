const apiUrl = 'http://localhost:3000/api/klima';
const lastCoolerUrl = 'http://localhost:3000/api/klima/last';
const coolersData = document.getElementById('coolersData');
const lastCoolerData = document.getElementById('lastCooler');

async function getCoolers() {

    try {
        const response = await fetch(apiUrl);
        const coolers = await response.json();

        coolersData.innerHTML = coolers.map(cooler => `
        <tr>
            <td>${cooler.Id}</td>
            <td>${cooler.RWidth}</td>
            <td>${cooler.RLength}</td>
            <td>${cooler.RHeight}</td>
            <td>${cooler.RVolume}</td>
            <td>${cooler.RInsulation}</td>
            <td>${cooler.CPower}</td>
            <td>${cooler.HPower}</td>
            <td>${cooler.SPower}</td>
        </tr>
        `).join('');
    }
    catch (e) {
        console.error(e.message);
        alert('Hiba történt az adatok elérése során!')
    }
}

async function getLastCooler() {
    try {
        const response = await fetch(lastCoolerUrl);
        const lastCooler = await response.json();

        lastCoolerData.innerHTML = lastCooler.map(lcooler => `
        <tr>
            <td>${lcooler.Id}</td>
            <td>${lcooler.RWidth}</td>
            <td>${lcooler.RLength}</td>
            <td>${lcooler.RHeight}</td>
            <td>${lcooler.RVolume}</td>
            <td>${lcooler.RInsulation}</td>
            <td>${lcooler.CPower}</td>
            <td>${lcooler.HPower}</td>
            <td>${lcooler.SPower}</td>
        </tr>
        `).join('');
    }
    catch (e) {
        console.error(e.message);
        alert('Hiba történt az adatok elérése során!')
    }
    const lastcoller = document.getElementById('last-cooler');
    lastcoller.scrollIntoView({ behavior: "smooth"});
}

document.getElementById('coolerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.width = parseFloat(data.width);
    data.length = parseFloat(data.length);
    data.height = parseFloat(data.height);
    data.insulation = parseInt(data.insulation);
    
    if (!data.width || !data.length || !data.height || !data.insulation) {
        alert('Hiányzó adatok!');
    } else {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const result = await response.json();

    if (response.ok) {
        alert(result.message);
        getLastCooler();
        getCoolers();
    } else {
        alert(result.message);
    }
    e.target.reset();
}
}
catch(e) {
    alert(e.message);
}
})

getLastCooler();
getCoolers();