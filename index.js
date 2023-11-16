const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)

//(e) 2014 Dünya kupası finali kazananı*/

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(fifaData) {
  const finalMaclar = fifaData.filter((mac) => mac.Stage == "Final");
  return finalMaclar;
}

//console.log(Finaller(fifaData));

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(fifaData, Finaller) {
  const finalYillari = Finaller(fifaData).map((mac) => {
    return mac.Year;
  });
  return finalYillari;
}
//console.log(Yillar(fifaData, Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(fifaData, Finaller) {
  const kazananlar = Finaller(fifaData).map((mac) => {
    if (mac["Home Team Goals"] > mac["Away Team Goals"]) {
      return mac["Home Team Name"];
    } else if (mac["Home Team Goals"] < mac["Away Team Goals"]) {
      return mac["Away Team Name"];
    } else {
      return "Beraberlik";
    }
  });
  return kazananlar;
}

//console.log(Kazananlar(fifaData, Finaller))

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

// function YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar) {
// 	const result = [];
// 	for(let i=0; i< Yillar(fifaData,Finaller).length; i++){
// 		result.push(`${Yillar(fifaData,Finaller)[i]} yılında, ${Kazananlar(fifaData, Finaller)[i]} dünya kupasını kazandı!`);
// 	}
// 	return result;
// };

function YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar) {
  return Yillar(fifaData, Finaller).reduce((result, yil, i) => {
    result.push(
      `${yil} yılında, ${
        Kazananlar(fifaData, Finaller)[i]
      } dünya kupasını kazandı!`
    );
    return result;
  }, []);
}

console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(Finaller) {
  let toplamGol = Finaller.reduce((toplam, mac) => {
    toplam += mac["Home Team Goals"] + mac["Away Team Goals"];
    return toplam;
  }, 0);
  toplamGol = (toplamGol / Finaller.length).toFixed(2);

  return toplamGol;
}
//console.log(OrtalamaGolSayisi(Finaller(fifaData)))

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(data) {
  const finalMaclar = data.filter((mac) => mac.Stage == "Final");

  const kazanan = (mac) => {
    if (mac["Home Team Goals"] > mac["Away Team Goals"]) {
      return mac["Home Team Initials"];
    } else if (mac["Home Team Goals"] < mac["Away Team Goals"]) {
      return mac["Away Team Initials"];
    } else {
      const winner = mac["Win conditions"].split(" win ")[0];
      const result =
        winner == mac["Home Team Name"]
          ? mac["Home Team Initials"]
          : mac["Away Team Initials"];
      return result;
    }
  };

  let sampiyonlarKisaltma = finalMaclar.reduce((sampiyonluk, mac) => {
    sampiyonluk = sampiyonluk.concat(kazanan(mac));
    return sampiyonluk;
  }, []);

  const sampiyonlukSayilari = {};
  sampiyonlarKisaltma.forEach((takim) => {
    if (sampiyonlukSayilari[takim]) {
      sampiyonlukSayilari[takim]++;
    } else {
      sampiyonlukSayilari[takim] = 1;
    }
  });
  return sampiyonlukSayilari;
}

//console.log(UlkelerinKazanmaSayilari(fifaData))

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(data) {
  const finalMaclar = data.filter((mac) => mac.Stage == "Final");

  const takimIsimleri = {};
  finalMaclar.forEach((takim) => {
    if (takim["Home Team Name"] in takimIsimleri) {
      takimIsimleri[takim["Home Team Name"]] += takim["Home Team Goals"];
    } else {
      takimIsimleri[takim["Home Team Name"]] = takim["Home Team Goals"];
    }
    if (takim["Away Team Name"] in takimIsimleri) {
      takimIsimleri[takim["Away Team Name"]] += takim["Away Team Goals"];
    } else {
      takimIsimleri[takim["Away Team Name"]] = takim["Away Team Goals"];
    }
  });

  let golSayisi = 0;
  let name;
  for (let key in takimIsimleri) {
    if (takimIsimleri[key] > golSayisi) {
      golSayisi = takimIsimleri[key];
      name = key;
    }
  }

  return { name, golSayisi };
}

console.log("Finallerde en çok gol atan: ", EnCokGolAtan(fifaData));

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(data) {
  const finalMaclar = data.filter((mac) => mac.Stage == "Final");

  const takimIsimleri = {};
  finalMaclar.forEach((takim) => {
    if (takim["Home Team Name"] in takimIsimleri) {
      takimIsimleri[takim["Home Team Name"]] += takim["Away Team Goals"];
    } else {
      takimIsimleri[takim["Home Team Name"]] = takim["Away Team Goals"];
    }
    if (takim["Away Team Name"] in takimIsimleri) {
      takimIsimleri[takim["Away Team Name"]] += takim["Home Team Goals"];
    } else {
      takimIsimleri[takim["Away Team Name"]] = takim["Home Team Goals"];
    }
  });

  let golSayisi = 0;
  let name;
  for (let key in takimIsimleri) {
    if (takimIsimleri[key] > golSayisi) {
      golSayisi = takimIsimleri[key];
      name = key;
    }
  }

  return { name, golSayisi };
}

console.log("Finallerde en çok gol yiyen: ", EnKotuDefans(fifaData));
/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};
