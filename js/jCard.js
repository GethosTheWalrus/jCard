jQuery(document).ready(function() {
	jQuery(document).click(function(e) {
		if(!jQuery('#'+e.target.id).hasClass('jModal') && jQuery('#'+e.target.id).hasClass('jCard') && !jQuery('#'+e.target.id).hasClass('noModal')) {
			jQuery('.jModal').addClass('float');
			jQuery('.jModal').css('cursor', 'pointer');
			jQuery('.jModal').removeClass('jModal');
			jQuery('#'+e.target.id).addClass('jModal');
			jQuery('#'+e.target.id).removeClass('float');
			jQuery('#'+e.target.id).css('cursor', 'auto');
			var fade = document.createElement('div');
			fade.setAttribute('class', 'dimmer');
			jQuery('body').append(fade);
			if(jQuery('#'+e.target.id).hasClass('modal-content-container')) {
				setTimeout(function() {
					jQuery('#'+e.target.id+' .modal-content').fadeIn(1000);
				}, 500);
			}
		} else if(jQuery('#'+e.target.id).hasClass('jModal')) {
			// jQuery('#'+e.target.id).removeClass('jModal');
			// jQuery('#'+e.target.id).css('cursor', 'auto');
			// jQuery('#'+e.target.id).addClass('float');
		} else {
			jQuery('.modal-content').fadeOut(450);
			jQuery('.jModal').addClass('float');
			jQuery('.jModal').css('cursor', 'pointer');
			jQuery('.jModal').removeClass('jModal');
			jQuery('.dimmer').remove();
		}
	});
});

function jCard(container, data) {
	makeContainer(container);

	jQuery('#'+container).css('color', data[0]['fontcolor']);
	jQuery('#'+container).css('font-weight', 'bold');

	// alert(data[0]['columns']);
	var width = data[0]['width'];
	var height = data[0]['height'];
	var cards = data[0]['data'].length;

	var cardCount = 0;
	while(cardCount < cards) {
		makeCard(width, height, 'jCardMenu .center', data[0]['data'], cardCount);
		cardCount++;
	}
}

function makeContainer(id) {
	//Menu wrapper
	var container = document.createElement('div');
	// container.style.background = '#2E0854';
	container.style.width = '100%';
	container.style.height = '100%';
	container.style.paddingTop = '12px';
	container.style.paddingBottom = '12px';
	container.setAttribute('id', 'jCardMenu');
	//Center wrapper
	var center = document.createElement('div');
	center.setAttribute('class', 'center');
	center.style.height = 'calc(100% - 10px)';
	center.style.width = '95%';
	center.style.textAlign = 'center';
	center.style.margin = '0 auto';
	center.style.margin = '0 auto';

	container.appendChild(center);
	jQuery('#'+id).append(container);
}

function makeCard(width, height, parentId, data, cardNo) {
	var card = document.createElement('div');
	card.setAttribute('data-number', cardNo);
	card.setAttribute('id', 'card-'+cardNo);
	card.style.display = 'inline-block';
	card.style.width = width;
	card.style.height = height;
	card.style.margin = '15px';
	card.style.background = 'white url("'+data[cardNo]['image']+'") no-repeat';
	card.style.backgroundSize = 'contain';
	card.style.backgroundPosition = 'center';
	card.setAttribute('onclick', 'javascript:window.location.href="'+data[cardNo]['href']+'";');
	card.setAttribute('class', 'jCard float');

	//Only modal types will expand on click
	if(data[cardNo]['type'] != 'modal' && data[cardNo]['type'] != 'modal-content' ) {
		card.setAttribute('class', 'jCard float noModal');
	}

	//Content modals will have content added to them
	if(data[cardNo]['type'] == 'modal-content') {
		var content = document.createElement('span');
		content.className = 'modal-content';
		content.style.display = 'none';
		content.style.left = '0px';
		content.style.position = 'absolute';
		content.style.width = width;
		content.style.height = height;
		content.style.borderRadius = '15px';
		content.style.background = 'white';
		content.style.textShadow = 'none';
		content.style.color = 'black';
		content.innerHTML = data[cardNo]['content'];
		card.className = card.className + ' modal-content-container';
		card.appendChild(content);
	}

	var text = document.createTextNode(data[cardNo]['caption']);
	var caption = document.createElement('span');
	caption.style.left = '0';
	caption.style.top = '102%';
	caption.style.width = '100%';
	caption.style.textAlign = 'center';
	caption.style.position = 'absolute';
	caption.style.zIndex = '3';
	caption.appendChild(text);
	card.appendChild(caption);
	jQuery('#'+parentId).append(card);
}