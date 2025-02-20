export const buffs = {
    'ku, buff mp': {
        name: 'Max MP Lv10',
        codes: [
            '6052000', '1020808', '1200001', '1220069',
            '2011234', '7012828', '3204544', '6010021',
            '6070013', '1011212', '4010090', '3210666'
        ]
    },
    'ku, buff hp': {
        name: 'Max HP Lv10',
        codes: [
            '1010203', '6010062', '1010032', '1010084',
            '1011945', '1234567', '3011143'
        ]
    },
    'ku, buff ampr': {
        name: 'AMPR Lv10',
        codes: [
            '2010068', '5010031', '5236969', '1011010',
            '3063101', '1010006', '1011010', '1023040',
            '3062728', '1010017', '1010456', '4040404'
        ]
    },
    'ku, buff cr': {
        name: 'Crit Rate Lv10',
        codes: [
            '6022292', '1200069', '1010006', '1010092',
            '1010017', '1010050', '1011010', '1012000',
            '7162029', '1100000'
        ]
    },
    'ku, buff watk': {
        name: 'Weapon Atk Lv10',
        codes: [
            '1010810', '3081024', '1010029', '1010099',
            '6010024', '1011126', '2020404', '2010136',
            '3222223'
        ]
    },
    'ku, buff str': {
        name: 'STR Lv10',
        codes: [
            '1110033', '1011069', '7031997', '7070777',
            '4016699', '2020303', '3010095', '3010085'
        ]
    },
    'ku, buff dex': {
        name: 'DEX Lv10',
        codes: [
            '4084545', '1010058', '5010092', '1010106',
            '7011001', '2020222', '1010058'
        ]
    },
    'ku, buff int': {
        name: 'INT Lv10',
        codes: [
            '2020707', '6061294', '1010489', '6010701',
            '1032222'
        ]
    },
    'ku, buff agi': {
        name: 'AGI Lv10',
        codes: [
            '7162029', '2020037'
        ]
    },
    'ku, buff accuracy': {
        name: 'Accuracy Lv10',
        codes: [
            '4261111'
        ]
    },
    'ku, buff mres': {
        name: 'Magical Resist Lv10',
        codes: [
            '2020505', '5200052', '1010004', '7010016', '7030023'
        ]
    },
    'ku, buff pres': {
        name: 'Physical Resist Lv10',
        codes: [
            '1020001', '1100000', '3010034', '7010014'
        ]
    },
    'ku, buff frac': {
        name: 'Fractional Barrier Lv10',
        codes: [
            '7010082'
        ]
    },
    'ku, buff +aggro': {
        name: 'Additional Aggro% Lv10',
        codes: [
            '7171717', '3030110', '2020606', '3053131', '6262000',
            '1010207', '3204544', '3158668', '1016646', '3030110', '1010207'
        ]
    },
    'ku, buff -aggro': {
        name: 'Aggro% Reduction Lv 10',
        codes: [
            '1010038', '1010002', '1010147', '1016646', '6010009',
            '3010018'
        ]
    },
    'ku, buff dte earth': {
        name: 'Damage To Earth Lv10',
        codes: [
            '2020202'
        ]
    },
    'ku, buff dte wind': {
        name: 'Damage To Wind Lv 9',
        codes: [
            '3210101'
        ]
    },
    'ku, buff dte water': {
        name: 'Damage To Water Lv10',
        codes: [
            '3210100'
        ]
    },
    'ku, buff dte fire': {
        name: 'Damage To Fire Lv9',
        codes: [
            '3210106'
        ]
    },
    'ku, buff dte light': {
        name: 'Damage To Light Lv10',
        codes: [
            '3210105'
        ]
    },
    'ku, buff dte dark': {
        name: 'Damage To dark Lv10',
        codes: [
            '1190020', '3210104'
        ]
    },
    'ku, buff dt neutral': {
        name: 'Damage To Neutral Lv10',
        codes: [
            '3210102'
        ]
    },
    'ku, buff drop rate': {
        name: 'Drop Rate Lv6',
        codes: [
            '1010084', '4196969'
        ]
    },
};

export function getFoodBuffResponse(command) {
    const buff = buffs[command.toLowerCase()];
    if (!buff) return null;

    return `Code Buff ${buff.name} 😁👍\n\n` +
        buff.codes.map(code => `${code} ${buff.name}`).join('\n') +
        '\n\nNote: jika foodbuff berubah / salah harap lapor admin 😉';
}
