var arrayStartsWith=function(arrayB,arrayS){
    for(var i=0;i<arrayS.length;i++){
        if(arrayS[i]!=arrayB[i]){
            return false;
        }
    }
    return true;
}
Loader.prototype.onLoaded = function (asset) {
    var data = new Uint8Array(asset);
    if (this._type == "image_decrypt" && asset) {
        if(!(arrayStartsWith(data,[0x89,0x4E,0x50])||arrayStartsWith(data,[0xFF,0xFF,0xD8])||arrayStartsWith(data,[0x47,0x46,0x49])||arrayStartsWith(data,[0x20,0x44,0x53]))){
            AssetManager.arrayBufferToTexture(asset, Callback.New(function (tex) {
                tex.url = this._url;
                this.complete(tex);
            }, this));
            return;
        }
        try {
            var temp = data[1];
            data[1] = data[2];
            data[2] = temp;
            var random = Math.floor((data.length - 1) * 0.5);
            var newData = new Uint8Array(data.length - 1);
            var firstPart = data.slice(0, random);
            var secondPart = data.slice(random + 1);
            newData.set(firstPart);
            newData.set(secondPart, firstPart.length);
            var __this = this;
            AssetManager.arrayBufferToTexture(newData.buffer, Callback.New(function (tex) {
                if (tex){
                    tex.url = __this._url;
                    __this.complete(tex);
                }else{
                    __this._type ="image";
                    __this._loadImage(__this.url);
                }
            }, this));
            return;
        }
        catch (e) {
            this._type ="image";
            this._loadImage(this.url);
            return;
        }
    }
    oldLoaded.apply(this, arguments);
};
if(!this.AssetsNotIncludeJSON_print_0){
    var AssetsNotIncludeJSON_print_0={};
}
if(!this.JSON_print_0){
    var JSON_print_0={};//'a': ['b','c']
}
if(!fs){
    var fs=require('fs');
}
function getAllFiles(filePath) {
    let allFilePaths = [];
    if (fs.existsSync(filePath)) {
        const files = fs.readdirSync(filePath);
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let currentFilePath = filePath + '/' + file;
            let stats = fs.lstatSync(currentFilePath);
            if (stats.isDirectory()) {
                allFilePaths = allFilePaths.concat(getAllFiles(currentFilePath));
            } else {
               allFilePaths.push(currentFilePath);
            }
        }
    } else {
        console.warn(`指定的目录${filePath}不存在！`);
    }
    return allFilePaths;
}

var print_cnt=true;
var OldLoaderManager_load=LoaderManager.prototype.load;
LoaderManager.prototype.load = function (url, complete, progress, type, priority, cache, group, ignoreCache) {
    var redirect=AssetsNotIncludeJSON_print_0[url];
    if(redirect)
        url=redirect;
    OldLoaderManager_load.apply(this, arguments);
}
ClientMain.prototype.loadStartupJson = function () {
    if (!Config.RELEASE_GAME) {
        SyncTask.taskOver(this.initTask);
        return;
    }
    var __this = this;
    AssetManager.loadFileArrayBuffer("asset/json/startup.json", Callback.New(function (buffer) {
        ZipManager.zipDeCompress(buffer, function (text) {
            if(!print_cnt){return;}
            print_cnt=false;
            try {
                startupJsons = JSON.parse(text);//Ch_print_0
            }
            catch (e) {
                console.trace(e)
                alert("cound not find the merged version of Json!");
                return;
            }
            console.trace('a')
            // for(var i in startupJsons){
            //     var repair=JSON_print_0[i]
            //     if(repair){
            //         for(var j in repair){
            //             Apply(startupJsons[i],repair[j]);
            //         }
            //     }
            // }
            for(var i in JSON_print_0){
                var origin=startupJsons[i];
                if(origin){
                    for(var j in JSON_print_0[i]){
                        if(stack.length!=0){console.log(`fatal error,  ${stack.join('_')}`)}
                        Apply(origin,JSON_print_0[i][j]);
                    }
                }
            }
            console.trace('b')
            var oldLoadJson1 = FileUtils.loadJsonFile;
            FileUtils.loadJsonFile = function (localURL, onFin, onErrorTips) {
                if (onErrorTips === void 0) { onErrorTips = true; }
                var bigJsonCacheObj = startupJsons[localURL];
                if (bigJsonCacheObj) {
                    onFin.delayRun(0, null, [bigJsonCacheObj]);
                    return;
                }
                oldLoadJson1.apply(FileUtils, [localURL, onFin, onErrorTips]);
            };
            SyncTask.taskOver(__this.initTask);
        }, 'gc_zip', true);
    }, this));
};
FileUtils.loadJsonFile = function (localURL, onFin, onErrorTips, forceNotCache) {
    if (onErrorTips === void 0) { onErrorTips = true; }
    if (forceNotCache === void 0) { forceNotCache = false; }
    var tail = (Common.inGC) ? "?r=" + Math.random() : "";
    FileUtils.loadFile(localURL + tail, new Callback(function (text) {
        if (!text) {
            onFin.runWith([null]);
            return;
        }
        if (Common.runPlatform == 2 && typeof text != "string") {
            onFin.runWith([text]);
            return;
        }
        try {
            text = text.replace(/(\n|^)[ \t]*\/\/.*/g, "");
            var jsonObj = JSON.parse(text);
            //Add
            var repair=JSON_print_0[localURL];
            if(repair){
                for(var j in repair){
                    if(stack.length!=0){console.log(`fatal error,  ${stack.join('_')}`)}
                    Apply(jsonObj,repair[j]);
                }
            }
            if (Common.runPlatform == 2 && !forceNotCache) {
                loader.cacheRes(localURL, jsonObj);
            }
        }
        catch (e) {
            console.trace(localURL + " parse error.");
            jsonObj = null;
        }
        onFin.runWith([jsonObj]);
    }, this), true, onErrorTips, forceNotCache);
};

//settings
global['getUUID_commands'] = function(cmdParam,array){
    if (!cmdParam)
        return null;
    var cmdType = cmdParam[0];
    if (cmdType < 10000) {
        var idInfo = cmdParam[cmdParam.length - 1];
        if (idInfo && typeof idInfo == "object" && idInfo.___cmdID) {
            return idInfo.___cmdID;
        }
    }
    else {
        return cmdParam[2];
    }
}
global['getUUID_commands_[]'] = function(elementOfArray,array){
    if(array.includes(elementOfArray)){
        return array.findIndex(item=>item===elementOfArray);
    }
    return null;
}

//code
var stack=[];
var isObject = obj => obj !== null && typeof obj === 'object';
if (!Array.isArray) {
    Array.isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
}
var Apply=function(objb,add){
    if(Array.isArray(add)){
        // console.trace('')
        var getID=global['getUUID_'+stack.join('_')];
        var array=objb;
        while(add.length!=0){
            var code=add.shift();
            if(code[0]==='del'){
                array.splice(array.findIndex(item=>getID(item,array)==code[1]),1).length===0 && console.log(`op_ERROR: del  info:${code[1]}, ${stack.join('_')}, ${debugInfo_fileOnUse}`)
            }else if(code[0]==='add'){
                if(code[2]){
                    var pos=array.findIndex(item=>getID(item,array)==code[1]);
                    pos==-1 && console.log(`op_ERROR: add  info:${code[1]}, ${stack.join('_')}, ${debugInfo_fileOnUse}`)
                    array.splice(pos+1,0,code[2]);
                }else{
                    array.unshift(code[1]);
                }
            }else if(code[0]==='obj'){
                var pos=array.findIndex(item=>getID(item,array)==code[1]);
                pos==-1&&console.log('op_ERROR: obj')
                if(Object.prototype.toString.call(code[2])==='[object String]' || !isObject(code[2])||!isObject(objb)){//Note  going2change
                    array[pos]=code[2];
                }else{
                    stack.push('[]');
                    Apply(array[pos],code[2]);
                    stack.pop();
                }
            }else if(code[0]==='rep'){
                var temp=[...code[1]];
                temp.unshift(0,array.length);
                Array.prototype.splice.apply(array,temp);
            }else if(code[0]==='ord'){
                var notOrderedSArray=[];
                for(var i in code[1]){
                    var pos=array.findIndex(item=>getID(item,array)==code[1][i]);
                    notOrderedSArray.push([pos,array[pos]]);
                }
                for(var i in code[2]){
                    array[notOrderedSArray[i][0]]=notOrderedSArray[code[2][i]][1];
                }
            }else{
                console.log('error-'+code[0]);
            }
        }
    }else{
        for(var i in add){
            if(Array.isArray(add[i])&&!objb){
                objb[i]=[];
            }
            if(isObject(add[i])&&isObject(objb[i])&&Object.prototype.toString.call(add[i])!=='[object String]'){//Note  going2change
                stack.push(i);
                console.log(i)
                Apply(objb[i],add[i]);
                stack.pop();
            }else{
                objb[i]=add[i];
            }
        }
    }
    return objb;
}

var fileLS=getAllFiles('AllAssetsBy_print_0');
for(var i in fileLS){
    var split=fileLS[i];
    split=split.split('/');
    split.splice(0,2,'asset');
    if(split[1]=='json'){
        split=split.join('/');
        if(!JSON_print_0[split]){
            JSON_print_0[split]=[];
        }
        JSON_print_0[split].push(JSON.parse(fs.readFileSync(fileLS[i]).toString()));
    }else{
        AssetsNotIncludeJSON_print_0[split.join('/')]=fileLS[i];
    }
}