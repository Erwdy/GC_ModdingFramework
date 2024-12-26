inf=open('../script.js','r',encoding='utf-8').read()
if inf.find('/*mod_start*/')==-1:
    open('../script.js','w',encoding='utf-8').write(inf+r"/*mod_start*/;window.document.title+='mod版本';try{var modList=require('fs').readFileSync('./mod.txt').toString();modList=modList.split(/[\s\n]/);for(var i=0;i<modList.length;i++){modList[i]=modList[i].split('|');}for(var i=0;i<modList.length;i+=2){if(modList[i][1]=='on'){try{var script=require('fs').readFileSync('./mod/'+modList[i][0]+'/script.js').toString();eval(script);}catch(e){alert('error:mod:'+modList[i][0]+':'+e.toString());}}}}catch(e){alert('error:'+e.toString());};/*mod_end*/")
#if inf[-11:]!='error\')}});':
#    out=inf+"\nrequire('fs').readFile('./mod/script.js',function(e,data){if(!e){eval(data.toString())}else{alert('mod error')}});"

#thi=ls[i].split('|')if(thi[1]=='on'){require('fs').readFile('./mod/'+thi[0]+'/script.js',function(e,data){if(!e){try{Function(data.toString())()}catch(e){alert('error:mod:'+thi[0])}}else{alert('error:mod:'+thi[0])}});} 
                                                                                                             

