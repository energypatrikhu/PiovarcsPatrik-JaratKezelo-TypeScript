export interface Jarat {
	jaratSzam: string;
	repterHonnan: string;
	repterHova: string;
	indulas: Date;
	keses: number;
}

export default class JaratKezelo {
	jaratok: Jarat[] = [];

	ujJarat(jaratSzam: string, repterHonnan: string, repterHova: string, indulas: Date): void {
		if (jaratSzam === '' || jaratSzam === null || jaratSzam === undefined) {
			throw new Error('A járatszám nem lehet üres!');
		}
		if (repterHonnan === '' || repterHonnan === null || repterHonnan === undefined) {
			throw new Error('A reptér honnan nem lehet üres!');
		}
		if (repterHova === '' || repterHova === null || repterHova === undefined) {
			throw new Error('A reptér hova nem lehet üres!');
		}
		if (indulas === null || indulas === undefined) {
			throw new Error('Az indulás nem lehet üres!');
		}

		if (this.jaratok.find((jarat) => jarat.jaratSzam === jaratSzam)) {
			throw new Error('A járatszám már létezik!');
		}

		this.jaratok.push({
			jaratSzam,
			repterHonnan,
			repterHova,
			indulas,
			keses: 0,
		});
	}

	keses(jaratSzam: string, keses: number): void {
		if (jaratSzam === '' || jaratSzam === null || jaratSzam === undefined) {
			throw new Error('A járatszám nem lehet üres!');
		}
		if (keses === null || keses === undefined) {
			throw new Error('A késés nem lehet üres!');
		}

		const jarat = this.jaratok.find((jarat) => jarat.jaratSzam === jaratSzam);

		if (!jarat) {
			throw new Error('Nincs ilyen járatszám!');
		}

		const ujKeses = jarat.keses + keses;

		if (ujKeses < 0) {
			throw new Error('A késés nem lehet negatív!');
		}

		jarat.keses = ujKeses;
	}

	mikorIndul(jaratSzam: string): Date {
		if (jaratSzam === '' || jaratSzam === null || jaratSzam === undefined) {
			throw new Error('A járatszám nem lehet üres!');
		}

		const jarat = this.jaratok.find((jarat) => jarat.jaratSzam === jaratSzam);

		if (!jarat) {
			throw new Error('Nincs ilyen járatszám!');
		}

		return jarat.indulas;
	}

	jaratokRepuloterrol(repter: string): string[] {
		if (repter === '' || repter === null || repter === undefined) {
			throw new Error('A reptér nem lehet üres!');
		}

		const jaratok = this.jaratok.filter((jarat) => jarat.repterHonnan === repter);

		if (jaratok.length === 0) {
			throw new Error('Nincs ilyen reptér!');
		}

		return jaratok.map((jarat) => jarat.jaratSzam);
	}
}
