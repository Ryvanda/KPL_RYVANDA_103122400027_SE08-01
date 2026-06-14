const skrng = new Date();

const formatter = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const kemaren = skrng.getDate() - 1;
skrng.setDate(kemaren);
const hasil = formatter.format(skrng);

console.log(hasil);
