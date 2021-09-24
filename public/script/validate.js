var erros = []

    var validateEmail = function(email) {
      var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return re.test(email)
  };

    if(!req.body.nomeCompleto || typeof req.body.nomeCompleto == undefined || req.body.nomeCompleto == null) {erros.push({texto: "Nome inválido"})}
    else if(req.body.nomeCompleto.length < 4) {erros.push({texto: "Nome muito curto, mínimo de 4 dígitos"})}
    else if(req.body.nomeCompleto.length > 30) {erros.push({texto: "Nome muito longo, máximo de 30 dígitos"})}



    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null) {erros.push({texto: "Email inválido"})}
    else if(req.body.email == validateEmail ) {erros.push({texto: "Email inválido str"})}



    function TestaCPF(strCPF) {
        var Soma;
        var Resto;
        Soma = 0;
      if (strCPF == "00000000000") return false;
    
      for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;
    
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
    
      Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
    
        if ((Resto == 10) || (Resto == 11))  Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
        return true;
    }
    var strCPF = req.body.cpf;
    console.log(TestaCPF(strCPF));

    if(!req.body.cpf || typeof req.body.cpf == undefined || req.body.cpf == null) {erros.push({texto: "CPF inválido"})}
    else if(req.body.cpf.length < 11) {erros.push({texto: "CPF inválido"})}
    else if(TestaCPF(strCPF) == false){erros.push({texto: "Insira um CPF válido existente"})}

    


      function calculaIdade(dataNasc){ 
      var dataAtual = new Date();
      var anoAtual = dataAtual.getFullYear();
      var anoNascParts = dataNasc.split('/');
      var diaNasc =anoNascParts[0];
      var mesNasc =anoNascParts[1];
      var anoNasc =anoNascParts[2];
      var idade = anoAtual - anoNasc;
      var mesAtual = dataAtual.getMonth() + 1; 
      //Se mes atual for menor que o nascimento, nao fez aniversario ainda;  
      if(mesAtual < mesNasc){
      idade--; 
      } else {
      //Se estiver no mes do nascimento, verificar o dia
      if(mesAtual == mesNasc){ 
      if(new Date().getDate() < diaNasc ){ 
      //Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
      idade--; 
      }
      }
      } 
      return idade; 
     }
     
    if(!req.body.dataNasc || typeof req.body.dataNasc == undefined || req.body.dataNasc == null) {erros.push({texto: "Data de Nascimento inválida"})}
    else if(calculaIdade(req.body.dataNasc) < 18){
      erros.push({texto: "Você precisa ser maior de idade para continuar!"})

     }
   



    if(!req.body.cep || typeof req.body.cep == undefined || req.body.cep == null) {erros.push({texto: "CEP inválido"})}
    else if(req.body.cep.length < 8) {erros.push({texto: "CEP inválido"})}

    if(!req.body.estado || typeof req.body.estado == undefined || req.body.estado == null) {erros.push({texto: "Estado inválido"})}

    if(!req.body.bairro || typeof req.body.bairro == undefined || req.body.bairro == null) {erros.push({texto: "Bairro inválido"})}

    if(!req.body.rua || typeof req.body.rua == undefined || req.body.rua == null) {erros.push({texto: "Rua inválido"})}

    if(!req.body.numero || typeof req.body.numero == undefined || req.body.numero == null || req.body.numero <= 0) {erros.push({texto: "Numero inválido"})}

     if(!req.body.check || typeof req.body.check == undefined || req.body.check == null || req.body.check.length <= 0){erros.push({texto: "Selecione ao menos um plano!"})}

    if(erros.length > 0 ){

        res.render(views + "parts/erros", {erros: erros})
        console.log(erros)
      

    }else{
  
      console.log(calculaIdade(req.body.dataNasc))
      console.log(req.body.cpf)
      console.log(req.body.check[0])

      novoPedido = {

        nomeCompleto: req.body.nomeCompleto,
        email: req.body.email,
        cpf: req.body.cpf,
        dataNasc: req.body.dataNasc,
        cep: req.body.cep,
        estado: req.body.estado,
        cidade: req.body.cidade,
        bairro: req.body.bairro,
        rua: req.body.rua,
        numero: req.body.numero,

      }

      new Pedido(novoPedido).save().then(() => {

        console.log("Pedido cadastrado com sucesso!")
        
        res.redirect("/contato")
        

      })

      .catch((erro) =>{

        console.log("Erro ao cadastrar pedido:" + erro)
        res.render(views + "contato")

      })
  
    }