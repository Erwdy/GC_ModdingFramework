inf=open('../script.js','r',encoding='utf-8').read()
before=inf.find('/*mod_start*/')
if before!=-1:
    after=inf.find('/*mod_end*/')
    open('../script.js','w',encoding='utf-8').write(inf[:before]+inf[after+len('/*mod_end*/'):])