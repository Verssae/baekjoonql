import axios from "axios";
import * as cheerio from "cheerio"
const BASE_URL = "https://www.acmicpc.net/";

export const versus = async(id1, id2) => {
  const {data} = await axios(`${BASE_URL}vs/${id1}/${id2}`)
  const $ = cheerio.load(data)
  const problems = $(".panel").find(".panel-body")
  var results = []
  for(var j=0; j<problems.length; j++) {
    var panels = problems.eq(j).find(".problem_number")
    var result = []
    for(var i=0; i<panels.length; i++) {
      let number = panels.eq(i).text()
      let title = panels.find(".problem_title").eq(i).text()
      result.push(number)
    }
    results.push(result)
  }
  console.log(`${id1} vs ${id2}`)
  return ({
    both: results[0],
    id1: results[1],
    id2: results[2]
  })
}

export const getProblems = async (id) => {
  const { data } = await axios(`${BASE_URL}status?problem_id=&user_id=${id}&language_id=-1&result_id=-1`);
  const $ = cheerio.load(data)
  const statusTable = $("#status-table").find('tbody').find('tr')
  const length = statusTable.length
  let results = []

  for (let i = 0; i < length; i++) {
    let st = statusTable.eq(i).find('td')
    results.push({
      id: st.eq(1).text(),
      title: st.eq(2).find('a').attr('title'),
      number: st.eq(2).find('a').text(),
      result: st.eq(3).text(),
      memory: st.eq(4).text(),
      time: st.eq(5).text(),
      language: st.eq(6).text(),
      length: st.eq(7).text(),
      submit: st.eq(8).text()
    })
  }
  console.log(`${id}'s trials`)

  return results

};

export const getRecentProblem = async (id) => {
  const { data } = await axios(`${BASE_URL}status?problem_id=&user_id=${id}&language_id=-1&result_id=-1`);
  const $ = cheerio.load(data)
  const st = $("#status-table").find('tbody').find('tr').first().find('td')
  console.log(`${id}'s recent trial`)
  return ({
      id: st.eq(1).text(),
      title: st.eq(2).find('a').attr('title'),
      number: st.eq(2).find('a').text(),
      result: st.eq(3).text(),
      memory: st.eq(4).text(),
      time: st.eq(5).text(),
      language: st.eq(6).text(),
      length: st.eq(7).text(),
      submit: st.eq(8).text()
    })

};