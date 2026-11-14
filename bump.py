# الاستخدام:  python bump.py 1.2.0 "ملاحظات الإصدار"
import re,sys,json,pathlib
v=sys.argv[1];n=sys.argv[2] if len(sys.argv)>2 else '';p=pathlib.Path(__file__).parent
t=(p/'index.html').read_text(encoding='utf8');t=re.sub(r"const APP_VERSION='[^']*'","const APP_VERSION='%s'"%v,t,1);(p/'index.html').write_text(t,encoding='utf8')
json.dump({'version':v,'notes':n,'files':['./','index.html','manifest.json','icon.svg','icon-192.png','icon-512.png']},open(p/'version.json','w',encoding='utf8'),ensure_ascii=False,indent=1)
print('تم رفع الإصدار إلى',v)
