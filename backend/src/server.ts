const serverConfig=(server:any,config:any)=>{
    const startServer=()=>{
        server.listen(config.port, () => {
            console.log(`Server listening on port ${config.port} - Post Service`);
          });
    }
    return {
        startServer
    }
}

export default serverConfig