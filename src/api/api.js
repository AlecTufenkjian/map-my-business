import { Octokit } from "octokit"
import axios from "axios"


const octokit = new Octokit({
    auth: process.env.GITHUBTOKEN
})



export const Commit = async (Owner,Repo) => {
    const temp = await octokit.request('GET /repos/{owner}/{repo}/commits{?sha,path,author,since,until,per_page,page}', {
        owner: Owner,
        repo: Repo
    })
    let logins = []
    const commits = temp.data;

    for (let i = 0; i < commits.length; i++) {
        if (commits[i].author !== null && !logins.includes(commits[i].author.login)) {
            logins.push(commits[i].author.login)
        }

    }

    let allUsers = []

    for (let j = 0; j < logins.length; j++) {
        const eachUser = await octokit.request('GET /users/{username}', {
            username: logins[j]
        })
        allUsers.push(eachUser.data);
    }
    for (let z = 0; z < allUsers.length; z++) {
        if (allUsers[z].location != null) {

            let strArr = allUsers[z].location.split(" ");

            let str = ""
            for (let s = 0; s < strArr.length; s++) {
                if (s == s.length - 1) {
                    str = str + strArr[s];
                }
                else {
                    str = str + strArr[s] + "+"
                }
            }
            let coord = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${str}&key=AIzaSyBhll2fXJ6qdqAJlBfBHv4g5y30vdM1IqY`)

            allUsers[z].coord = coord.data.results[0].geometry.location;
        }
        else{
            allUsers[z].coord = {};
        }
    }
    let allSent = []
    allUsers.forEach((user) => {
        allSent.push({"username": user.login,"Name": user.name,"location" : user.location,"email" : user.email,"coord" : user.coord ,})
    })
    return allSent
}
export const noOfUsers = async (Owner,Repo) => {

    const temp = await octokit.request('GET /repos/{owner}/{repo}/commits{?sha,path,author,since,until,per_page,page}', {
        owner: Owner,
        repo: Repo
    })
    let array = []
    let arrayStru = []
    temp.data.map((element) => {
        if(element.author != null && !array.includes(element.author.login)){
            array.push(element.author.login);
            const obj = {"login" : element.author.login ,"counter" : 0};
            arrayStru.push(obj)
        }
    })

    arrayStru.map((element) =>{ 
        temp.data.map((el) => {
            if(el.author != null && el.author.login == element.login){
                element.counter = element.counter +1;
            }
        })
    })
    return arrayStru;
    
}
