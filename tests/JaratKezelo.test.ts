import { describe, beforeEach, it, expect } from 'vitest';
import JaratKezelo, { Jarat } from '../src/JaratKezelo';

describe('JaratKezelo', () => {
	let jaratKezelo: JaratKezelo;

	beforeEach(() => {
		jaratKezelo = new JaratKezelo();
	});

	it('hozzá kell adnia egy új jaratot', () => {
		const jarat: Jarat = {
			jaratSzam: 'ABC123',
			repterHonnan: 'BUD',
			repterHova: 'LHR',
			indulas: new Date(),
			keses: 0,
		};

		jaratKezelo.ujJarat(jarat.jaratSzam, jarat.repterHonnan, jarat.repterHova, jarat.indulas);

		expect(jaratKezelo.jaratok.length).toBe(1);
		expect(jaratKezelo.jaratok[0]).toEqual(jarat);
	});

	it('hibát kell dobnia, amikor új jaratot ad hozzá üres jaratSzam-mal', () => {
		expect(() => {
			jaratKezelo.ujJarat('', 'BUD', 'LHR', new Date());
		}).toThrowError('A járatszám nem lehet üres!');
	});
	it('hibát kell dobnia, amikor új jaratot ad hozzá undefined jaratSzam-mal', () => {
		expect(() => {
			jaratKezelo.ujJarat(undefined, 'BUD', 'LHR', new Date());
		}).toThrowError('A járatszám nem lehet üres!');
	});
	it('hibát kell dobnia, amikor új jaratot ad hozzá null jaratSzam-mal', () => {
		expect(() => {
			jaratKezelo.ujJarat(null, 'BUD', 'LHR', new Date());
		}).toThrowError('A járatszám nem lehet üres!');
	});

	it('hibát kell dobnia, amikor új jaratot ad hozzá üres repterHonnan-nal', () => {
		expect(() => {
			jaratKezelo.ujJarat('ABC123', '', 'LHR', new Date());
		}).toThrowError('A reptér honnan nem lehet üres!');
	});
	it('hibát kell dobnia, amikor új jaratot ad hozzá undefined repterHonnan-nal', () => {
		expect(() => {
			jaratKezelo.ujJarat('ABC123', undefined, 'LHR', new Date());
		}).toThrowError('A reptér honnan nem lehet üres!');
	});
	it('hibát kell dobnia, amikor új jaratot ad hozzá null repterHonnan-nal', () => {
		expect(() => {
			jaratKezelo.ujJarat('ABC123', null, 'LHR', new Date());
		}).toThrowError('A reptér honnan nem lehet üres!');
	});

	it('hibát kell dobnia, amikor új jaratot ad hozzá üres repterHova-val', () => {
		expect(() => {
			jaratKezelo.ujJarat('ABC123', 'BUD', '', new Date());
		}).toThrowError('A reptér hova nem lehet üres!');
	});
	it('hibát kell dobnia, amikor új jaratot ad hozzá undefined repterHova-val', () => {
		expect(() => {
			jaratKezelo.ujJarat('ABC123', 'BUD', undefined, new Date());
		}).toThrowError('A reptér hova nem lehet üres!');
	});
	it('hibát kell dobnia, amikor új jaratot ad hozzá null repterHova-val', () => {
		expect(() => {
			jaratKezelo.ujJarat('ABC123', 'BUD', null, new Date());
		}).toThrowError('A reptér hova nem lehet üres!');
	});

	it('hibát kell dobnia, amikor új jaratot ad hozzá undefined indulas-al', () => {
		expect(() => {
			jaratKezelo.ujJarat('ABC123', 'BUD', 'LHR', undefined);
		}).toThrowError('Az indulás nem lehet üres!');
	});
	it('hibát kell dobnia, amikor új jaratot ad hozzá null indulas-al', () => {
		expect(() => {
			jaratKezelo.ujJarat('ABC123', 'BUD', 'LHR', null);
		}).toThrowError('Az indulás nem lehet üres!');
	});

	it('hibát kell dobnia, amikor új jaratot ad hozzá egy meglévő jaratSzam-mal', () => {
		jaratKezelo.ujJarat('ABC123', 'BUD', 'LHR', new Date());

		expect(() => {
			jaratKezelo.ujJarat('ABC123', 'BUD', 'LHR', new Date());
		}).toThrowError('A járatszám már létezik!');
	});

	it('frissítenie kell a keses-t egy jarat-nak', () => {
		const jarat: Jarat = {
			jaratSzam: 'ABC123',
			repterHonnan: 'BUD',
			repterHova: 'LHR',
			indulas: new Date(),
			keses: 0,
		};

		jaratKezelo.ujJarat(jarat.jaratSzam, jarat.repterHonnan, jarat.repterHova, jarat.indulas);
		jaratKezelo.keses(jarat.jaratSzam, 30);

		expect(jaratKezelo.jaratok[0].keses).toBe(30);
	});

	it('hibát kell dobnia, ha egy nem létező jarat keses-ét frissíti', () => {
		expect(() => {
			jaratKezelo.keses('ABC123', 30);
		}).toThrowError('Nincs ilyen járatszám!');
	});

	it('hibát kell dobnia, amikor a keses negatív értékkel frissül', () => {
		const jarat: Jarat = {
			jaratSzam: 'ABC123',
			repterHonnan: 'BUD',
			repterHova: 'LHR',
			indulas: new Date(),
			keses: 0,
		};

		jaratKezelo.ujJarat(jarat.jaratSzam, jarat.repterHonnan, jarat.repterHova, jarat.indulas);

		expect(() => {
			jaratKezelo.keses(jarat.jaratSzam, -30);
		}).toThrowError('A késés nem lehet negatív!');
	});

	it('vissza kell adnia egy jarat indulatát', () => {
		const jarat: Jarat = {
			jaratSzam: 'ABC123',
			repterHonnan: 'BUD',
			repterHova: 'LHR',
			indulas: new Date(),
			keses: 0,
		};

		jaratKezelo.ujJarat(jarat.jaratSzam, jarat.repterHonnan, jarat.repterHova, jarat.indulas);
		const result = jaratKezelo.mikorIndul(jarat.jaratSzam);

		expect(result).toEqual(jarat.indulas);
	});

	it('hibát kell dobnia, ha egy nem létező jarat indulatát kapja meg', () => {
		expect(() => {
			jaratKezelo.mikorIndul('ABC123');
		}).toThrowError('Nincs ilyen járatszám!');
	});

	it('vissza kell adnia a jaratSzam-okat egy adott repter-ről', () => {
		const jarat1: Jarat = {
			jaratSzam: 'ABC123',
			repterHonnan: 'BUD',
			repterHova: 'LHR',
			indulas: new Date(),
			keses: 0,
		};

		const jarat2: Jarat = {
			jaratSzam: 'DEF456',
			repterHonnan: 'BUD',
			repterHova: 'CDG',
			indulas: new Date(),
			keses: 0,
		};

		jaratKezelo.ujJarat(jarat1.jaratSzam, jarat1.repterHonnan, jarat1.repterHova, jarat1.indulas);
		jaratKezelo.ujJarat(jarat2.jaratSzam, jarat2.repterHonnan, jarat2.repterHova, jarat2.indulas);
		const result = jaratKezelo.jaratokRepuloterrol('BUD');

		expect(result).toEqual([jarat1.jaratSzam, jarat2.jaratSzam]);
	});

	it('hibát kell dobnia, amikor jaratok egy nem létező repterről kapja a jarat-okat', () => {
		expect(() => {
			jaratKezelo.jaratokRepuloterrol('BUD');
		}).toThrowError('Nincs ilyen reptér!');
	});
});
