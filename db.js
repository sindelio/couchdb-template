const nano = require('nano')('http://admin:admin@localhost:5984');
// Nano is promise aware, almost all functions return promises!

async function createDb(dbName){
	try {
		var newDb = await nano.db.create(dbName);
	} catch (error) {
		console.error('Error in the DB:', error);
	}
	// console.log('newDb', newDb);
	return newDb;
}

function useExistingDb(dbName){
	try {
		var db = nano.db.use(dbName); // use() does not return a promise 
	} catch (error) {
		console.error('Error in the DB:', error);
	}
	// console.log('db', db);
	return db;
}

async function getInformationAboutDb(dbName){
	try {
		var info = await nano.db.get(dbName);
	} catch (error) {
		console.error('Error in the DB:', error);
	}
	// console.log('info', info);
	return info;
}

async function destroyDb(dbName){
	try {
		var result = await nano.db.destroy(dbName);
	} catch (error) {
		console.error('Error in the DB:', error);
	}
	// console.log('result', result);
	return result;
}

async function insertDocumentInDb(db, document, documentName){
	try {
		var result = await db.insert(document, documentName);
		
	} catch (error) {
		console.error('Error in the DB:', error);
	}
	console.log('insertResult', result);
	return result;
}

async function getDocumentFromDb(db, documentName){
	try {
		var result = await db.get(documentName);
	} catch (error) {
		console.error('Error in the DB:', error);
	}
	console.log('getResult', result);
	return result;
}

async function destroyDocumentFromDb(db, documentName){
	try {
		var result = await db.destroy(documentName);
	} catch (error) {
		console.error('Error in the DB:', error);
	}
	// console.log('destroyResult', result);
	return result;
}

// Example usage
(async function (){
	// await createDb('testdb'); // a-z 0-9 only
	const db = useExistingDb('testdb');
	await getInformationAboutDb('testdb');
	// await insertDocumentInDb(db, { key: 'value' }, 'documentName');
	await getDocumentFromDb(db, 'documentName');
	// await destroyDocumentFromDb(db, 'testDocument');
	// await destroyDb('testdb');
}());

module.exports = {
	createDb,
	useExistingDb,
	getInformationAboutDb,
	destroyDb,
	insertDocumentInDb,
	getDocumentFromDb,
	destroyDocumentFromDb
}
