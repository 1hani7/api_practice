let tenDays = null;
let data = [];

async function getDayBox(date){
    const apiUrl = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?';
    const apiKey = 'key=2308fbf71d40ed61712d0284758d4612&';
    const targetDay = `targetDt=${date}&`;
    const itemPerPage = `itemPerPage=100&`
    var temp = await fetch(apiUrl + apiKey + targetDay + itemPerPage).then(r=>r.json()).then(r=>r);
    return temp.boxOfficeResult.dailyBoxOfficeList;
}

window.onload=async function(){
    tenDays=tenDayCal();
    console.log(tenDays);

    let refine = {};
    
    for( i in tenDays ){
        var tmp = await getDayBox(tenDays[i]);
        for( item of tmp ){
            if( !( item.movieNm in refine ) ) refine[item.movieNm] = new Object();
            if( item.movieNm in refine ){
                refine[item.movieNm][tenDays[i]] = item.audiCnt;
            }
            // console.log( item.movieNm in refine )
        }
    }
    console.log(refine);

}

function tenDayCal(){
    var tmp = new Array();

    const currentDate = new Date();
    for( var i=1; i<11; i++ ){
        const yesterday = new Date(currentDate);
        yesterday.setDate(currentDate.getDate() - i);
        const formattedDate = formatDateToYYYYMMDD(yesterday);
        tmp.push(formattedDate);
    }

    return tmp;
}

function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1을 해줍니다.
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}${month}${day}`;
}