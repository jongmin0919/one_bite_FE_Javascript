const API_UTL = "https://random-quote.hyobb.com/"
const quoteElement = document.getElementById("quote")

const nowDate = new Date()
const month = nowDate.getMonth();
const date = nowDate.getDate();

const getQuote = async () => {
  try {
    const data = await fetch(API_UTL).then((res) => res.json())
    const result = data[1].respond
    setQuote(result)
  } catch (err) {
    console.error(`error : ${err}`);
    setQuote(`작은 기회로 부터 종종 위대한 업적이 시작된다.`)
  }
}

const setQuote = (result) => {
  let quote = { createDate: `${month}-${date}`, quoteData: result }
  localStorage.setItem("quote", JSON.stringify(quote))
  quoteElement.textContent = result;
}

getQuote()