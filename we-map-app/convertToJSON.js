const XLSX = require('xlsx');
const fs = require('fs');

// 엑셀 파일 읽기
const workbook = XLSX.readFile('total_code_revised.xlsx');
const firstSheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[firstSheetName];

// JSON으로 변환
const jsonData = XLSX.utils.sheet_to_json(worksheet);

// 파일로 저장
fs.writeFileSync('locationData.json', JSON.stringify(jsonData, null, 2), 'utf-8');
console.log('Conversion completed!');
