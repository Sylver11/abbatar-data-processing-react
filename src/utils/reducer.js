
export function reducer(testSet1, testSet2){
    let arr3 = [];
    for(var i in testSet1){
        var shared = false;
        for (var j in testSet2){
            if(testSet2[j].name == testSet1[i].name){
                var index = arr3.findIndex(({ name }) => name === testSet2[j].name);
                if (index === -1) {
                    arr3.push(Object.entries(testSet1[i]).reduce((acc, [key, val]) => {          
                        if(key != 'name'){
                            acc[key] = (acc[key] || 0) + val;    
                        }
                        return acc;
                    },  { ...testSet2[j] }));
                } else {
                    arr3[index] = Object.entries(testSet1[i]).reduce((acc, [key, val]) => {          
                            if(key != 'name'){
                                acc[key] = (acc[key] || 0) + val;    
                            }
                            return acc;
                        },  { ...testSet2[j] })
                }
        shared = true;
        break;
      }
      if (!shared && arr3.filter(e => e.name === testSet2[j].name ).length <= 0) {
        arr3.push(testSet2[j])
      }
    }
    if(!shared){
      arr3.push(testSet1[i])
    } 
  }
  return arr3;
}
