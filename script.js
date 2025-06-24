// DOM Elements
const totalAmountInput = document.getElementById('totalAmount');
const taxPercentageInput = document.getElementById('taxPercentage');
const serviceChargeInput = document.getElementById('serviceCharge');
const discountInput = document.getElementById('discount');
const numPeopleInput = document.getElementById('numPeople');
const tipPercentageInput = document.getElementById('tipPercentage');

// Result elements
const subtotalElement = document.getElementById('subtotal');
const taxAmountElement = document.getElementById('taxAmount');
const serviceAmountElement = document.getElementById('serviceAmount');
const tipAmountElement = document.getElementById('tipAmount');
const discountAmountElement = document.getElementById('discountAmount');
const grandTotalElement = document.getElementById('grandTotal');
const perPersonElement = document.getElementById('perPerson');

// Feature elements
const toggleUnevenSplitBtn = document.getElementById('toggleUnevenSplit');
const unevenSplitContainer = document.getElementById('unevenSplitContainer');
const personInputsContainer = document.getElementById('personInputs');
const addPersonBtn = document.getElementById('addPersonBtn');
const saveHistoryBtn = document.getElementById('saveHistory');
const clearHistoryBtn = document.getElementById('clearHistory');
const historySection = document.getElementById('historySection');
const historyList = document.getElementById('historyList');

// State
let isUnevenSplit = false;
let personCount = 2;
let calculationHistory = [];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadHistory();
    setupEventListeners();
    calculate();
});

// Setup event listeners
function setupEventListeners() {
    // Input change listeners
    const inputs = [totalAmountInput, taxPercentageInput, serviceChargeInput, 
                   discountInput, numPeopleInput, tipPercentageInput];
    
    inputs.forEach(input => {
        input.addEventListener('input', calculate);
    });

    // Feature buttons
    toggleUnevenSplitBtn.addEventListener('click', toggleUnevenSplit);
    addPersonBtn.addEventListener('click', addPersonInput);
    saveHistoryBtn.addEventListener('click', saveCurrentCalculation);
    clearHistoryBtn.addEventListener('click', clearHistory);
}

// Main calculation function
function calculate() {
    const totalAmount = parseFloat(totalAmountInput.value) || 0;
    const taxPercentage = parseFloat(taxPercentageInput.value) || 0;
    const serviceChargePercentage = parseFloat(serviceChargeInput.value) || 0;
    const discount = parseFloat(discountInput.value) || 0;
    const numPeople = parseInt(numPeopleInput.value) || 1;
    const tipPercentage = parseFloat(tipPercentageInput.value) || 0;

    // Calculate components
    const subtotal = totalAmount;
    const taxAmount = (subtotal * taxPercentage) / 100;
    const serviceAmount = (subtotal * serviceChargePercentage) / 100;
    const tipAmount = (subtotal * tipPercentage) / 100;
    
    // Calculate grand total
    const grandTotal = subtotal + taxAmount + serviceAmount + tipAmount - discount;
    
    // Calculate per person
    let perPerson = grandTotal / numPeople;

    // Update display
    updateDisplay(subtotal, taxAmount, serviceAmount, tipAmount, discount, grandTotal, perPerson);
    
    // Update uneven split if active
    if (isUnevenSplit) {
        updateUnevenSplitCalculation(grandTotal);
    }
}

// Update display with calculated values
function updateDisplay(subtotal, taxAmount, serviceAmount, tipAmount, discount, grandTotal, perPerson) {
    subtotalElement.textContent = formatCurrency(subtotal);
    taxAmountElement.textContent = formatCurrency(taxAmount);
    serviceAmountElement.textContent = formatCurrency(serviceAmount);
    tipAmountElement.textContent = formatCurrency(tipAmount);
    discountAmountElement.textContent = `-${formatCurrency(discount)}`;
    grandTotalElement.textContent = formatCurrency(grandTotal);
    perPersonElement.textContent = formatCurrency(perPerson);
}

// Format currency to Indonesian Rupiah
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Toggle uneven split feature
function toggleUnevenSplit() {
    isUnevenSplit = !isUnevenSplit;
    
    if (isUnevenSplit) {
        unevenSplitContainer.style.display = 'block';
        toggleUnevenSplitBtn.textContent = 'Nonaktifkan Split Tidak Merata';
        toggleUnevenSplitBtn.style.background = 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)';
        initializeUnevenSplit();
    } else {
        unevenSplitContainer.style.display = 'none';
        toggleUnevenSplitBtn.textContent = 'Aktifkan Split Tidak Merata';
        toggleUnevenSplitBtn.style.background = 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)';
        personInputsContainer.innerHTML = '';
    }
}

// Initialize uneven split inputs
function initializeUnevenSplit() {
    personInputsContainer.innerHTML = '';
    const numPeople = parseInt(numPeopleInput.value) || 2;
    
    for (let i = 0; i < numPeople; i++) {
        addPersonInput();
    }
}

// Add person input for uneven split
function addPersonInput() {
    const personDiv = document.createElement('div');
    personDiv.className = 'person-input';
    
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = `Nama Orang ${personInputsContainer.children.length + 1}`;
    nameInput.className = 'person-name';
    
    const amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.placeholder = 'Jumlah yang dimakan (Rp)';
    amountInput.className = 'person-amount';
    amountInput.min = '0';
    
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Hapus';
    removeBtn.onclick = function() {
        personDiv.remove();
        updateUnevenSplitCalculation();
    };
    
    // Only show remove button if more than 1 person
    if (personInputsContainer.children.length > 0) {
        personDiv.appendChild(removeBtn);
    }
    
    personDiv.appendChild(nameInput);
    personDiv.appendChild(amountInput);
    personInputsContainer.appendChild(personDiv);
    
    // Add event listeners
    nameInput.addEventListener('input', updateUnevenSplitCalculation);
    amountInput.addEventListener('input', updateUnevenSplitCalculation);
    
    updateUnevenSplitCalculation();
}

// Update uneven split calculation
function updateUnevenSplitCalculation(grandTotal = null) {
    if (!isUnevenSplit) return;
    
    if (grandTotal === null) {
        grandTotal = parseFloat(grandTotalElement.textContent.replace(/[^\d]/g, '')) || 0;
    }
    
    const personInputs = personInputsContainer.querySelectorAll('.person-input');
    let totalPersonAmount = 0;
    const results = [];
    
    personInputs.forEach((personDiv, index) => {
        const nameInput = personDiv.querySelector('.person-name');
        const amountInput = personDiv.querySelector('.person-amount');
        
        const name = nameInput.value || `Orang ${index + 1}`;
        const amount = parseFloat(amountInput.value) || 0;
        
        totalPersonAmount += amount;
        results.push({ name, amount });
    });
    
    // Calculate proportional split
    if (totalPersonAmount > 0) {
        results.forEach(result => {
            const proportion = result.amount / totalPersonAmount;
            result.share = grandTotal * proportion;
        });
    } else {
        // Equal split if no amounts specified
        const equalShare = grandTotal / results.length;
        results.forEach(result => {
            result.share = equalShare;
        });
    }
    
    // Update display
    updateUnevenSplitDisplay(results, grandTotal, totalPersonAmount);
}

// Update uneven split display
function updateUnevenSplitDisplay(results, grandTotal, totalPersonAmount) {
    // Remove existing results
    const existingResults = unevenSplitContainer.querySelector('.uneven-results');
    if (existingResults) {
        existingResults.remove();
    }
    
    // Create results display
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'uneven-results';
    resultsDiv.style.marginTop = '20px';
    resultsDiv.style.padding = '15px';
    resultsDiv.style.background = '#f0fff4';
    resultsDiv.style.borderRadius = '10px';
    resultsDiv.style.border = '1px solid #9ae6b4';
    
    let resultsHTML = '<h4 style="margin-bottom: 15px; color: #2f855a;">Hasil Split Tidak Merata:</h4>';
    
    results.forEach((result, index) => {
        const percentage = totalPersonAmount > 0 ? ((result.amount / totalPersonAmount) * 100).toFixed(1) : (100 / results.length).toFixed(1);
        resultsHTML += `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding: 10px; background: white; border-radius: 8px;">
                <div>
                    <strong>${result.name}</strong><br>
                    <small style="color: #718096;">Makan: ${formatCurrency(result.amount)} (${percentage}%)</small>
                </div>
                <div style="text-align: right;">
                    <strong style="color: #2f855a;">${formatCurrency(result.share)}</strong>
                </div>
            </div>
        `;
    });
    
    resultsHTML += `
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #9ae6b4; text-align: center;">
            <strong>Total: ${formatCurrency(grandTotal)}</strong>
        </div>
    `;
    
    resultsDiv.innerHTML = resultsHTML;
    unevenSplitContainer.appendChild(resultsDiv);
}

// Save current calculation to history
function saveCurrentCalculation() {
    const calculation = {
        id: Date.now(),
        timestamp: new Date().toLocaleString('id-ID'),
        totalAmount: parseFloat(totalAmountInput.value) || 0,
        taxPercentage: parseFloat(taxPercentageInput.value) || 0,
        serviceChargePercentage: parseFloat(serviceChargeInput.value) || 0,
        discount: parseFloat(discountInput.value) || 0,
        numPeople: parseInt(numPeopleInput.value) || 1,
        tipPercentage: parseFloat(tipPercentageInput.value) || 0,
        grandTotal: parseFloat(grandTotalElement.textContent.replace(/[^\d]/g, '')) || 0,
        perPerson: parseFloat(perPersonElement.textContent.replace(/[^\d]/g, '')) || 0
    };
    
    calculationHistory.unshift(calculation);
    
    // Keep only last 10 calculations
    if (calculationHistory.length > 10) {
        calculationHistory = calculationHistory.slice(0, 10);
    }
    
    saveHistoryToStorage();
    displayHistory();
    
    // Show success animation
    saveHistoryBtn.classList.add('success');
    setTimeout(() => {
        saveHistoryBtn.classList.remove('success');
    }, 600);
}

// Display history
function displayHistory() {
    if (calculationHistory.length === 0) {
        historySection.style.display = 'none';
        return;
    }
    
    historySection.style.display = 'block';
    historyList.innerHTML = '';
    
    calculationHistory.forEach(calculation => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        historyItem.innerHTML = `
            <h4>Perhitungan - ${calculation.timestamp}</h4>
            <div class="history-details">
                <div>Total Tagihan: <span>${formatCurrency(calculation.totalAmount)}</span></div>
                <div>PPN: <span>${calculation.taxPercentage}%</span></div>
                <div>Service Charge: <span>${calculation.serviceChargePercentage}%</span></div>
                <div>Tips: <span>${calculation.tipPercentage}%</span></div>
                <div>Diskon: <span>${formatCurrency(calculation.discount)}</span></div>
                <div>Jumlah Orang: <span>${calculation.numPeople}</span></div>
                <div>Total Akhir: <span style="color: #667eea; font-weight: 600;">${formatCurrency(calculation.grandTotal)}</span></div>
                <div>Per Orang: <span style="color: #48bb78; font-weight: 600;">${formatCurrency(calculation.perPerson)}</span></div>
            </div>
            <button onclick="loadCalculation(${calculation.id})" class="btn-secondary" style="margin-top: 10px;">Gunakan Lagi</button>
        `;
        
        historyList.appendChild(historyItem);
    });
}

// Load calculation from history
function loadCalculation(id) {
    const calculation = calculationHistory.find(calc => calc.id === id);
    if (!calculation) return;
    
    totalAmountInput.value = calculation.totalAmount;
    taxPercentageInput.value = calculation.taxPercentage;
    serviceChargeInput.value = calculation.serviceChargePercentage;
    discountInput.value = calculation.discount;
    numPeopleInput.value = calculation.numPeople;
    tipPercentageInput.value = calculation.tipPercentage;
    
    calculate();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Clear history
function clearHistory() {
    if (confirm('Apakah Anda yakin ingin menghapus semua riwayat perhitungan?')) {
        calculationHistory = [];
        saveHistoryToStorage();
        displayHistory();
    }
}

// Save history to localStorage
function saveHistoryToStorage() {
    localStorage.setItem('splitBillHistory', JSON.stringify(calculationHistory));
}

// Load history from localStorage
function loadHistory() {
    const saved = localStorage.getItem('splitBillHistory');
    if (saved) {
        calculationHistory = JSON.parse(saved);
        displayHistory();
    }
}

// Auto-calculate when number of people changes
numPeopleInput.addEventListener('change', function() {
    if (isUnevenSplit) {
        initializeUnevenSplit();
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to save
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        saveCurrentCalculation();
    }
    
    // Escape to clear form
    if (e.key === 'Escape') {
        if (confirm('Apakah Anda yakin ingin mengosongkan semua input?')) {
            totalAmountInput.value = '';
            taxPercentageInput.value = '11';
            serviceChargeInput.value = '10';
            discountInput.value = '0';
            numPeopleInput.value = '2';
            tipPercentageInput.value = '5';
            calculate();
        }
    }
});

// Add tooltips and help text
function addHelpText() {
    const helpTexts = {
        'totalAmount': 'Masukkan total harga makanan sebelum PPN dan biaya lainnya',
        'taxPercentage': 'Persentase Pajak Pertambahan Nilai (PPN) - default 11%',
        'serviceCharge': 'Persentase biaya pelayanan - default 10%',
        'discount': 'Jumlah diskon yang didapat (jika ada)',
        'numPeople': 'Jumlah orang yang akan membagi tagihan',
        'tipPercentage': 'Persentase tips yang ingin diberikan - default 5%'
    };
    
    Object.keys(helpTexts).forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.title = helpTexts[id];
        }
    });
}

// Initialize help text
addHelpText();

// Add some sample data for demonstration
function addSampleData() {
    if (!totalAmountInput.value) {
        totalAmountInput.value = '150000';
        calculate();
    }
}

// Auto-add sample data after a delay
setTimeout(addSampleData, 1000); 