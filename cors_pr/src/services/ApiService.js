import provide from 'vue'

var express = require('express');
var app = express();

let key = 'ServiceKey=K0B3Y48HAF56XXL0ADR2&';
let detail = 'detail=Y&';
let listCount = 'listCount=50&';
let releaseDts = 'releaseDts=20220801&';
let releaseDte = `releaseDte=${todayYYYYMMDD()}&`;

let DT = [];

app.get('/',function(req,res){
    var api_url = 'http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&'+key+detail+listCount+releaseDts+releaseDte;
    var request = require('request');
    var options = {
        url: api_url,
        'Access-Control-Allow-Origin':'*'
    };
    request.get(options, function(error, response, body){
        if(!error && response.statusCode == 200){
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
            DT = JSON.parse(body);
            console.log(body);
        }else{
            console.log('error  = ' + response.statusCode);
        }
    })
})
app.listen(3000, function(){
    console.log('connected!')
})

export default{
    setup(){
        console.log(DT);
        provide('DT', DT)
    }
}