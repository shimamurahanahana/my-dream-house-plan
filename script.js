const planTabs = [...document.querySelectorAll('[data-plan-tab]')];
const planPanels = [...document.querySelectorAll('[data-plan-panel]')];
const planDetails = {
	site: {
		number: '04',
		title: 'Газар ба тохижилт',
		copy: '50 × 40 м (2000 м²) газар, 1 м = 10 px масштабтай. Машин бүгд хойд талд тул урд хашаа хүүхдэд аюулгүй. Хойд, баруун захын мод хүйтэн салхийг хаана. Хүлэмж ба үйлчилгээний байр руу явах ус, бохирын шугам хөлдөлтийн гүнээс доош булагдана. Дотор эгнээнд алим, чацаргана, үхрийн нүд тарьж, гадна эгнээний шилмүүст мод тэднийг салхинаас хамгаална. Септик зогсоолын захад тул соруулах машин ойрхон хүрнэ; худгаас ~38 м. Эцсийн зайг норм, хөрсний судалгаагаар батална.',
	},
	ground: {
		number: '01',
		title: 'Нэгдүгээр давхар',
		copy: 'Хойд зүгийн хүйтэн салхинаас хамгаалж гол хаалгыг зүүн талд, гаражийн талд гаргав. Тамбураар дамжин холл руу орох тул өвөл хүйтэн агаар шууд орохгүй. Зочны өрөөг урд нарны талд гаргаж, том цонх ба террас руу гарах хаалгатай болгов. Гал тогоо, хоолны хэсэг баруун талд нэг нээлттэй орон зай. Ариун цэврийн өрөө 2-р давхрын ванны яг доор тул усны шугам богино.',
	},
	upper: {
		number: '02',
		title: 'Хоёрдугаар давхар',
		copy: 'Шатнаас дунд коридор гарч, өрөө бүр коридороос тусдаа хаалгаар орно — нэг өрөөгөөр дамжин нөгөөд орохгүй. Гол унтлагын өрөө болон жижиг өрөө 02 урд нарны талд том цонхтой, гол унтлагаас урд тагт руу гарна. Техникийн өрөөг унтлагын өрөөнүүдээс хамгийн хол, баруун хойд буланд байрлуулав; батарейн даац, агааржуулалт, галын аюулгүй байдлыг инженер батална.',
	},
	basement: {
		number: '03',
		title: 'Зоорь',
		copy: 'Зоорийг бүх байшингийн доор биш, гол шатны доор ба баруун урд хэсэгт ойролцоогоор 4.6 × 5.2 м хэмжээтэй хийв. Хүнс ногоо хадгалахад ~16 м² хангалттай бөгөөд малталт, ус тусгаарлалтын зардал, чийгийн эрсдэл багасна. Сэрүүн агуулахыг дулаалгатай хаалгаар тусгаарлаж, орох ба гарах агааржуулалтын хоолойтой болгоно.',
	},
	roof: {
		number: '05',
		title: 'Дээврийн дээрээс',
		copy: 'Хойд зүгийг дээш гэж үзээд урд налууг нарны хавтангийн боломжит талбай болголоо. Налуу, тоо, бэхэлгээг хэрэглээ болон цас-салхины тооцоогоор тогтооно.',
	},
	water: {
		number: '06',
		title: 'Ус ба шугам сүлжээ',
		copy: 'Худгийн байрнаас хүйтэн усны гол шугам байшингийн коллектор ба бойлер руу, салаа нь хүлэмж ба үйлчилгээний байр руу явна. Байшинд ариун цэврийн өрөө ба ванн давхцсан тул босоо шугам нэг газраар явна. Байшин ба үйлчилгээний байрны бохир септикт орно. Бүх гадна шугам хөлдөлтийн гүнээс доош; худаг-септикийн зай ≈ 38 м.',
	},
};

function activatePlan(tab, moveFocus = false) {
	const selectedPlan = tab.dataset.planTab;
	planTabs.forEach((item) => {
		const isSelected = item === tab;
		item.setAttribute('aria-selected', String(isSelected));
		item.tabIndex = isSelected ? 0 : -1;
	});
	planPanels.forEach((panel) => {
		panel.hidden = panel.dataset.planPanel !== selectedPlan;
	});

	const detail = planDetails[selectedPlan];
	document.querySelector('[data-aside-number]').textContent = detail.number;
	document.querySelector('[data-aside-title]').textContent = detail.title;
	document.querySelector('[data-aside-copy]').textContent = detail.copy;
	document.querySelector('[data-pipe-legend]').hidden = selectedPlan !== 'water';
	document.querySelector('[data-symbol-legend]').hidden = !['ground', 'upper', 'basement'].includes(selectedPlan);
	if (moveFocus) tab.focus();
}

planTabs.forEach((tab, index) => {
	tab.addEventListener('click', () => activatePlan(tab));
	tab.addEventListener('keydown', (event) => {
		let nextIndex;
		if (event.key === 'ArrowRight') nextIndex = (index + 1) % planTabs.length;
		else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + planTabs.length) % planTabs.length;
		else if (event.key === 'Home') nextIndex = 0;
		else if (event.key === 'End') nextIndex = planTabs.length - 1;
		else return;

		event.preventDefault();
		activatePlan(planTabs[nextIndex], true);
	});
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
	link.addEventListener('click', (event) => {
		const target = document.querySelector(link.getAttribute('href'));
		if (!target) return;

		event.preventDefault();
		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		history.replaceState(null, '', link.getAttribute('href'));
	});
});
