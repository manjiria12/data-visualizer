class DataStructuresVisualizer {
    constructor() {
        this.array = [];
        this.stack = [];
        this.queue = [];
        this.isSorting = false;
        this.isPaused = false;
        this.animationSpeed = 100;
        this.sortingBars = [];
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupTabs();
        this.generateInitialArray();
        this.renderStack();
        this.renderQueue();
    }

    bindEvents() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Sorting controls
        document.getElementById('generateArray').onclick = () => this.generateArray();
        document.getElementById('bubbleSortBtn').onclick = () => this.bubbleSort();
        document.getElementById('selectionSortBtn').onclick = () => this.selectionSort();
        document.getElementById('resetArray').onclick = () => this.resetArray();
        document.getElementById('pauseBtn').onclick = () => this.togglePause();

        document.getElementById('speedSlider').oninput = (e) => {
            this.animationSpeed = parseInt(e.target.value);
            document.getElementById('speedValue').textContent = this.animationSpeed + 'ms';
        };

        // Stack controls
        document.getElementById('stackPush').onclick = () => this.stackPush();
        document.getElementById('stackPop').onclick = () => this.stackPop();
        document.getElementById('stackReset').onclick = () => this.stackReset();

        // Queue controls
        document.getElementById('queueEnqueue').onclick = () => this.queueEnqueue();
        document.getElementById('queueDequeue').onclick = () => this.queueDequeue();
        document.getElementById('queueReset').onclick = () => this.queueReset();
    }

    switchTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        event.target.classList.add('active');
        document.getElementById(tabName).classList.add('active');
        
        const tabNames = {
            sorting: 'Sorting Visualizer',
            stack: 'Stack (LIFO)',
            queue: 'Queue (FIFO)'
        };
        this.updateExplanation(`🔄 Switched to ${tabNames[tabName]}!`);
    }

    // === SORTING ===
    generateArray() {
        this.array = Array.from({length: 30}, () => Math.floor(Math.random() * 80) + 20);
        this.renderSortingArray();
        this.updateExplanation('🎲 Generated new random array!\nReady for sorting algorithms.');
    }

    generateInitialArray() {
        this.generateArray();
    }

    renderSortingArray() {
        const canvas = document.getElementById('sortingCanvas');
        canvas.innerHTML = '';
        this.sortingBars = [];

        const maxHeight = 350;
        const maxValue = Math.max(...this.array);

        this.array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'sorting-bar';
            bar.style.height = `${(value / maxValue) * maxHeight}px`;
            bar.style.width = `${90 / this.array.length}%`;
            bar.dataset.index = index;
            bar.textContent = value;
            canvas.appendChild(bar);
            this.sortingBars.push(bar);
        });
    }

    async sleep(ms) {
        while (this.isPaused && this.isSorting) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async bubbleSort() {
        if (this.isSorting) return;
        this.isSorting = true;
        this.generateArray();
        
        this.updateExplanation('🫧 BUBBLE SORT STARTED\n• Compares adjacent elements\n• Swaps if out of order\n• Largest bubbles to end');

        for (let i = 0; i < this.array.length - 1; i++) {
            let swapped = false;
            for (let j = 0; j < this.array.length - i - 1; j++) {
                this.markComparing(j, j + 1);
                await this.sleep(this.animationSpeed);

                if (this.array[j] > this.array[j + 1]) {
                    this.updateExplanation(`🔄 SWAP: ${this.array[j]} > ${this.array[j + 1]}\nSwapping positions ${j} and ${j + 1}`);
                    this.swap(j, j + 1);
                    swapped = true;
                    await this.sleep(this.animationSpeed * 1.5);
                }
                this.clearMarks();
            }
            if (!swapped) break;
        }

        this.markSorted();
        this.isSorting = false;
        this.updateExplanation('✅ BUBBLE SORT COMPLETED!\nTime Complexity: O(n²)');
    }

    async selectionSort() {
        if (this.isSorting) return;
        this.isSorting = true;
        this.generateArray();
        
        this.updateExplanation('🔍 SELECTION SORT STARTED\n• Finds minimum in unsorted portion\n• Swaps with first unsorted element');

        for (let i = 0; i < this.array.length - 1; i++) {
            let minIdx = i;
            for (let j = i + 1; j < this.array.length; j++) {
                this.markComparing(minIdx, j);
               
