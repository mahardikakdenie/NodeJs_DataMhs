const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// MEMBUAT FILE jika belum ada

const dataPath = "./data/Mahasiswa.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// JSON
const loadMahasiswa = () => {
  const file = fs.readFileSync("data/Mahasiswa.json", "utf8");
  const mahasiswa = JSON.parse(file);
  return mahasiswa;
};

// SimpanData
const simpanMahasiswa = (nama, email, noHp, jurusan) => {
  const dataMhs = {
    nama,
    email,
    noHp,
    jurusan,
  };
  // call Functions
  const Mahasiswa = loadMahasiswa();
  // cek duplikat
  const duplikat = Mahasiswa.find((dataMhs) => dataMhs.nama === nama);
  if (duplikat !== undefined) {
    console.log(
      chalk.red.bold("the dataMhs is already registered using another name")
    );
    return false;
  }
  const duplicate = Mahasiswa.find((x) => x.noHp === noHp)
  if (duplicate !== undefined) {
    console.log(
        chalk.red.bold("telephone number is registered, use another telephone number")
      );
  }

  // cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.bold("E-mail is not Valid"));
      return false;
    }
  }
  if (!validator.isMobilePhone(noHp, "id-ID")) {
    console.log(chalk.red.bold("Phone Number is not Valid"));
    return false;
  }
  Mahasiswa.push(dataMhs);
  console.log(chalk.blue.bold("Thank you for entering data"));

  fs.writeFileSync("data/Mahasiswa.json", JSON.stringify(Mahasiswa));
};

const listMahasiswa = () => {
  const mahasiswa = loadMahasiswa();
  console.log(chalk.cyan.bold("\n- List Mahasiswa : \n"));
  mahasiswa.forEach((x, i) => {
    console.log(`${i + 1}. ${x.nama} - ${x.email} - ${x.noHp} - ${x.jurusan}`);
  });
};

// Detail
const detailMahasiswa = (nama) => {
  const dataMhs = loadMahasiswa();

  const contact = dataMhs.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.bold(`${nama} is not found !!`));
    return false;
  }

  console.log(chalk.cyan.bold(contact.nama));
  console.log(contact.noHp);
  if (contact.email) {
    console.log(contact.email);
  }
};

// Delete dataMhs by Name
const deleteMahasiswa = (nama, hp) => {
  const dataMhs = loadMahasiswa();


  if (nama) {
    const newData = dataMhs.filter(
      (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
    );
    if (dataMhs.length === newData.length) {
      console.log(chalk.red.bold(`${nama} is not found !!`));
      return false;
    }
    fs.writeFileSync(dataPath, JSON.stringify(newData));
    console.log(chalk.blue.bold(`${nama} deleted successfully`));
  }
};
module.exports = {
  simpanMahasiswa,
  listMahasiswa,
  detailMahasiswa,
  deleteMahasiswa,
};
