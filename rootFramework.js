/*mod_start*//*this is the mod framework for gc game developer*/
;window.document.title+='mod版本';
try{
    var fs=require('fs');
    if(!fs.existsSync('./mod.txt')){
        fs.writeFileSync('./mod.txt','')
    }
    var modList=fs.readFileSync('./mod.txt').toString();
    if(modList.includes('\r')){
        modList=modList.replaceAll('\r','');
    }
    modList=modList.split(/\n/);
    for(var i=0;i<modList.length;i++){
        if(modList[i].includes('|')){
            modList[i]=modList[i].split('|');
        }else if(modList[i].includes('/')){
            modList[i]=modList[i].split('/');
        }else if(modList[i].includes(':')){
            modList[i]=modList[i].split(':');
        }
        if(modList[i].length==1 && modList[i][0]==''){
            modList.splice(i,1);
        }
    }
    var codeLS={}
    var workshopPath=`../../workshop/content/${3265880}`;//game appid
    if(fs.existsSync(workshopPath)){
        var directories = fs.readdirSync(workshopPath);
        for(var i in directories){
            if(!fs.lstatSync(`${workshopPath}/${directories[i]}`).isDirectory()){continue;}
            var two=fs.readdirSync(`${workshopPath}/${directories[i]}`)
            for(var j in two){
                if(two[j].includes('ScriptNameFlag_')){
                    var codeName=two[j].slice(15);
                    codeName=codeName.split('.')[0];
                    if(fs.existsSync(`${workshopPath}/${directories[i]}/script.js`)){
                        codeLS[codeName]=`${workshopPath}/${directories[i]}/script.js`;
                        if(isFirstRun){
                            fs.appendFileSync('./mod.txt',`${codeName}:on\n`);
                            modList.push([codeName,'on']);
                            modList.push([]);
                        }
                    }
                }
            }
        }
    }
    for(var i=0;i<modList.length;i+=2){
        if(modList[i][1]=='on'){
            try
            {
                var script=require('fs').readFileSync(codeLS[modList[i][0]]?codeLS[modList[i][0]]:'./mod/'+modList[i][0]+'/script.js').toString();
                eval(script);
            }catch(e){
                alert('error:mod:'+modList[i][0]+':'+e.toString());
            }
        }
    }
}catch(e){alert('error:'+e.toString());};
/*mod_end*/