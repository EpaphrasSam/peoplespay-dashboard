const converter = (file: any) => new Promise((resolve, reject) => {
    try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        return reader;
    } catch (error) {
        console.log(error)
    }
})

export default converter;