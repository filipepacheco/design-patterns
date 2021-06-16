import fs from 'fs';

class Journal {
    entries: String[]
    count: number

    addEntry(text: string) {
        this.entries[this.count] = `${++this.count}: ${text}`
        return this.count
    }

    removeEntry(index: number) {
        delete this.entries[index];
    }

    toString() {
        return Object.values(this.entries).join('\n');
    }
}

class PersistanceManager {

    preprocess (j: any) { }

    saveToFile (journal: Journal, filename: string) {
        const a = fs.writeFileSync(filename, journal.toString())
        console.log(a);
    }
}

const j = new Journal();
j.addEntry("Entry number one")
j.addEntry("Entry number two")

console.log(j.toString());

// separation of concerns

const p = new PersistanceManager()
p.saveToFile(j, "journal.txt")