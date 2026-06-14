require('dotenv').config();

async function ambilData() {
    try {
        const respon = await fetch(process.env.BASE_API, {
            headers: {
                'Accept': 'application/json'
            }
        });

        if(!respon.ok) throw new Error('Gagal mengambil data');
        const data = await respon.json();
        console.log(data.joke);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

ambilData();

const angka = 19000000;
const formatter = new Intl.NumberFormat('id-ID', {
    notation: 'compact',
    compactDisplay: 'long',
});

console.log(formatter.format(angka));