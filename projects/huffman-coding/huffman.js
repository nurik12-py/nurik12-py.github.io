class TreeNode {
    constructor(val, freq, left, right) {
        this.val = val;
        this.freq = freq;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

class HuffmanCode {
    constructor(text) {
        this.text = text;
    }

    getLetterFrequencyMap() {
        let map = {};
        for (let letter of this.text) {
            if (letter in map) {
                map[letter]++;
            } else {
                map[letter] = 1;
            }
        }
        return map;
    }

    getPriorityQueue() {
        let queue = [];
        let frequencyMap = this.getLetterFrequencyMap(this.text);

        Object.keys(frequencyMap).forEach((letter) => {
            queue.push(new TreeNode(letter, frequencyMap[letter]));
        });

        queue.sort((a, b) => a.freq - b.freq);
        return queue;
    }

    getHuffmanTree() {
        let queue = this.getPriorityQueue(this.text);
        let root = null;

        while (queue.length > 1) {
            let left = queue.shift();
            let right = queue.shift();
            let z = new TreeNode('', left.freq + right.freq, left, right);
            root = z;
            queue.push(z);
        }

        return root;
    }

    getHuffmanMap(root) {
        let map = {};

        let dfs = (root, binary) => {
            if (root.left == null && root.right == null && root.val !== '') {
                map[root.val] = binary;
                return;
            }
            dfs(root.left, binary + "0");
            dfs(root.right, binary + "1");
        }

        dfs(root, "");

        return map;
    }

    getCompresedBinary() {
        let huffmanTree = this.getHuffmanTree();
        let huffmanMap = this.getHuffmanMap(huffmanTree);
        let compresedBinary = "";
        this.text.split("").forEach((letter) => {
            compresedBinary += " " + huffmanMap[letter];
        });
        return compresedBinary;
    }

}
