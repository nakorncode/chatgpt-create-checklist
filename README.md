# My Checklist

อ่านบทความแบบเต็มที่ [https://nakorncode.com/blog/เรามาดูกันดีกว่าว่าจะสั่งให้-ChatGPT-สร้างทั้งเว็บได้อย่างไร](https://nakorncode.com/blog/เรามาดูกันดีกว่าว่าจะสั่งให้-ChatGPT-สร้างทั้งเว็บได้อย่างไร)

## วิธีเริ่มต้นระบบ

หากเริ่มต้นระบบไม่เป็น แนะนำว่าต้องเรียนรู้วิธีการใช้คำสั่งผ่าน [CLI](https://www.freecodecamp.org/news/command-line-commands-cli-tutorial/) และการใช้ [Git](https://www.atlassian.com/git/tutorials)

1. ติดตั้ง [Node.js](https://nodejs.org/en/) แนะนำเป็นเวอร์ชั่น LTS
2. รันคำสั่ง `npm install`
3. รันคำสั่ง `npm run migrate`
4. รันคำสั่ง `npm run start`
5. เปิดเว็บบราวเซอร์และไปที่ [http://127.0.0.1:3000/](http://127.0.0.1:3000/)

สำหรับฐานข้อมูลสามารถเปิดดูที่ไฟล์ `./checklist.db` โดยใช้ [DB Browser for SQLite](https://sqlitebrowser.org/) หรือ [DBeaver](https://dbeaver.io/)