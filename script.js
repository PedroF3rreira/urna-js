let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let numeros = document.querySelector('.d-1-3');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let fotos = document.querySelector('.d-1-right');

let etapaAtual = 0;
let num = '';
let votoBranco = false;
let votos = [];
function iniciarEtapas() {
	
	let etapa = etapas[etapaAtual];
	
	num = '';
	
	let numeroAtual = '';
	let contador = etapa.numeros;
	for (let i = 0; i < contador; i++) {
		if(i === 0){
			numeroAtual += "<div class='numero pisca'></div>";
		}
		else{
			numeroAtual += "<div class='numero'></div>";
		}
	}

	seuVotoPara.style.display = 'none';
	cargo.innerHTML = etapa.titulo;
	descricao.innerHTML = '';
	fotos.innerHTML = '';
	aviso.style.display = 'none';
	numeros.innerHTML = numeroAtual;

}
function atualizaInterface () {
	let etapa = etapas[etapaAtual];
	
	//filtra candidatos pelos numeros digitados e retorna um array com resultados
	let candidato = etapa.candidatos.filter( el => {
		if(el.numero === parseInt(num)){
			return true;			
		}
		else{
			return false;
		}
	});

	if(candidato.length > 0){
		
		seuVotoPara.style.display = 'block';
		aviso.style.display = 'block';
		descricao.innerHTML = `Nome: ${candidato[0].nome} <br> Partido: ${candidato[0].partido}`;
		fotos.style.display = 'block';
		let fotosHTML = '';
		for(let i in candidato[0].fotos){
			fotosHTML += `<img class="img"src="${candidato[0].fotos[i].img}"/>${candidato[0].fotos[i].legenda}`
		}
		fotos.innerHTML = fotosHTML;
	}
	else{
		seuVotoPara.style.display = 'block';
		aviso.style.display = 'block';
		descricao.innerHTML = '<div class="aviso--grande">Deseja anular seu voto</div>';	
	}

	
}

function clicou (n) {
	let elNumero = document.querySelector('.numero.pisca');
	console.log(elNumero)
	if(elNumero !== null){
		
		elNumero.innerHTML = n;

		num = `${num}${n}`

		elNumero.classList.remove('pisca');
		
		if(elNumero.nextElementSibling !== null){
			elNumero.nextElementSibling.classList.add('pisca');
		}
		else{
			atualizaInterface();
		}
	}
}
function branco () {
	if(num.length == 0){
		votoBranco = true;
		seuVotoPara.style.display = 'block';
		numeros.innerHTML = '';
		aviso.style.display = 'block'
		descricao.innerHTML = '<div class="aviso--grande">VOTO EM BRANCO</div>';	
	}
	else{

	}
}
function corrige () {
	iniciarEtapas();	 
}
function confirma() {
	let etapa = etapas[etapaAtual];
	let votoConfirmado = false;

	if(votoBranco){
		seuVotoPara.style.display = 'none';
		aviso.style.display = 'none';
		fotos.innerHTML = '';
		numeros.innerHTML = '';
		cargo.innerHTML = '';
		descricao.innerHTML = '<div class="aviso--grande">VOTO BRANCO CONFIRMADO </div>'
		votoConfirmado = true;
	}else if(num.length == etapa.numeros){
		seuVotoPara.style.display = 'none';
		aviso.style.display = 'none';
		fotos.innerHTML = '';
		numeros.innerHTML = '';
		cargo.innerHTML = '';
		descricao.innerHTML = '<div class="aviso--grande">VOTO EM VERIADOR CONFIRMADO </div>'
		votoConfirmado = true;
	}
	
	seuVotoPara.style.display = 'none';
	aviso.style.display = 'none';
	fotos.innerHTML = '';
	numeros.innerHTML = '';
	cargo.innerHTML = '';
	votoConfirmado = true;
	descricao.innerHTML = '<div class="aviso--grande">VOTO NULO CONFIRMADO </div>'	

	if(votoConfirmado){
		etapaAtual++;
		if(etapas[etapaAtual] != null){
			iniciarEtapas();
		}
		else{
			descricao.innerHTML = '<div class="aviso--gigante">FIM</div>';
			etapaAtual = 0;
			num = '';
			setTimeout(() => iniciarEtapas(), 3000)				
		}
	}
	
}

iniciarEtapas();