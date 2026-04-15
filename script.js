class DataStructuresVisualizer {
    constructor() {
        this.isSorting = false;
        this.isPaused = false;
        this.animationSpeed = 50;
        this.currentTab = 'sorting';
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupTabs();
        this.generateInitialArray();
        this.updateExplanation('Welcome! Select a tab to start learning data structures visually 🚀');
    }

    bindEvents() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Sorting controls
        document.getElementById('generateArray').addEventListener('click', () => this.generateArray());
        document.getElementById('bubbleSortBtn').addEventListener('click', () => this.bubbleSort());
        document.getElementById('selectionSortBtn').addEventListener('click', () => this.selectionSort());
        document.getElementById('resetArray').addEventListener('click', () => this.resetArray());
        document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('speedSlider').addEventListener('input', (e) => this.updateSpeed(e.target.value));

        // Stack controls
        document.getElementById('stackPush').addEventListener('click', () => this.stackPush());
        document.getElementById('stackPop').addEventListener('click', () => this.stackPop());
        document.getElementById('stackReset').addEventListener('click', () => this.stackReset());

        // Queue controls
        document.getElementById('queueEnqueue').addEventListener('click', () => this.queueEnqueue());
        document.getElementById('queueDequeue').addEventListener('click', () => this.queueDequeue());
        document.getElementById('queueReset').addEventListener('click', () => this.queueReset());
    }

    switchTab(tabName) {
        this.currentTab = tabName;
        
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        event.target.classList.add('active');
        document.getElementById(tabName).classList.add('active');
        
        this.updateExplanation(`Switched to ${tabName.charAt(0).toUpperCase() + tabName.slice(1)} tab!`);
    }

    // === SORTING ===
    generateArray() {
        const array = [];
        const canvas = document.getElementById('sortingCanvas');
        canvas.innerHTML = '';
        
        for (let i = 0; i < 25; i++) {
            array.push(Math.floor(Math.random() * 90) + 10);
        }
        
        this.renderSortingArray(array);
        this.updateExplanation('✅ Generated random array of 25 elements!');
    }

    generateInitialArray() {
        this.generateArray();
    }

    renderSortingArray(array) {
        const canvas = document.getElementById('sortingCanvas');
        canvas.innerHTML = '';
        
        const maxHeight = 350;
        const maxValue = Math.max(...array);
        
        array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'sorting-bar';
            bar.style.height = `${(value / maxValue) * maxHeight}px`;
            bar.style.width = `${90 / array.length}%`;
            bar.textContent = value;
            canvas.appendChild(bar);
        });
    }

    async bubbleSort() {
        if (this.isSorting) return;
        
        this.isSorting = true;
        const array = Array.from({length: 25}, () => Math.floor(Math.random() * 90) + 10);
        this.renderSortingArray(array);
        
        this.updateExplanation('🔄 Starting Bubble Sort...\nBubble Sort compares adjacent elements and swaps them if they are in wrong order.');
        
        let swapped;
        for (let i = 0; i < array.length - 1 && this.isSorting; i++) {
            swapped = false;
            for (let j = 0; j < array.length - i - 1 && this.isSorting; j++) {
                this.markComparing(j, j + 1);
                await this.sleep(this.animationSpeed);
                
                if (array[j] > array[j + 1]) {
                    this.updateExplanation(`🔄 Comparing ${array[j]} and ${array[j + 1]}... Swapping!`);
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    this.markSwapping(j, j + 1);
                    swapped = true;
                    await this.sleep(this.animationSpeed);
                }
                
                this.clearMarks(j, j + 1);
            }
            if (!swapped) break;
        }
        
        this.isSorting = false;
        this.updateExplanation('✅ Bubble Sort completed! 🎉');
    }

    async selectionSort() {
        if (this.isSorting) return;
        
        this.isSorting = true;
        const array = Array.from({length: 25}, () => Math.floor(Math.random() * 90) + 10);
        this.renderSortingArray(array);
        
        this.updateExplanation('🔄 Starting Selection Sort...\nSelection Sort finds minimum element in unsorted portion and places it at beginning.');
        
        for (let i = 0; i < array.length - 1 && this.isSorting; i++) {
            let minIdx = i;
            this.updateExplanation(`🔍 Finding minimum from index ${i} to end...`);
            
            for (let j = i + 1; j < array.length && this.isSorting; j++) {
                this.markComparing(minIdx, j);
                await this.sleep(this.animationSpeed);
                
                if (array[j] < array[minIdx]) {
                    this.clearMarks(minIdx, j);
                    minIdx = j;
                    this.markComparing(minIdx, j);
                }
            }
            
            if (minIdx !== i) {
                this.updateExplanation(`🔄 Swapping ${array[i]} with minimum ${array[minIdx]} at index ${minIdx}`);
                [array[i], array[minIdx]] = [array[minIdx], array[i]];
                this.markSwapping(i, minIdx);
                await this.sleep(this.animationSpeed);
            }
            
            this.clearMarks(i, minIdx);
        }
        
        this.isSorting = false;
        this.updateExplanation('✅ Selection Sort completed! 🎉');
    }

    markComparing(idx1, idx2) {
        const bars = document.querySelectorAll('.sorting-bar');
        bars[idx1].classList.add('comparing');
        bars[idx2].classList.add('comparing');
    }

    markSwapping(idx1, idx2) {
        const bars = document.querySelectorAll('.sorting-bar');
        bars[idx1].classList.remove('comparing');
        bars[idx2].classList.remove('comparing');
        bars[idx1].classList.add('swapping');
        bars[idx2
