const genId = () => {
    const id = Math.random().toString(32).substring(2) + Date.now();
    return id
}
export default genId