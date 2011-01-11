/* 
 Copyright 2010 - Prefeitura Municipal de Fortaleza

 Este arquivo é parte do programa jquery-input-deflate-plugin

 O Ação é um software livre; você pode redistribui-lo e/ou modifica-lo
 dentro dos termos da Licença Pública Geral GNU como publicada pela
 Fundação do Software Livre (FSF); na versão 2 da Licença.

 Este programa é distribuido na esperança que possa ser util, mas SEM
 NENHUMA GARANTIA; sem uma garantia implicita de ADEQUAÇÂO a qualquer
 MERCADO ou APLICAÇÃO EM PARTICULAR. Veja a Licença Pública Geral GNU
 para maiores detalhes.

 Você deve ter recebido uma cópia da Licença Pública Geral GNU, sob o
 título "LICENCA.txt", junto com este programa, se não, escreva para a
 Fundação do Software Livre(FSF) Inc., 51 Franklin St, Fifth Floor,
 */
(function($){
	$.fn.inputDeflate = function (options) {
		var suffix = options['suffix'] || '_input_deflate'; 
		var removeClass = options['removeClass'];
		var addClass = options['addClass'];
		var inflate = options['inflate'];
		var deflate = options['deflate'];
		if (!inflate || !deflate)
			throw("Inflate and deflate functions are mandatory");
		return this.each(function() {
			// elemento selecionado...
			$this = $(this);

			// primeiro precisamos criar um clone do elemento
			clone2 = $this.clone();
			
			// entao sobrescrevemos o id e o name com o sufixo
			if (clone2.attr('id'))
				clone2.attr('id', $this.attr('id') + suffix);
			if (clone2.attr('name'))
				clone2.attr('name', $this.attr('id') + suffix);

			// geramos o valor do input novo com o resultado do inflate
			var value = $this.val();
			clone2.val(inflate(value));
			
			// associamos o onChange do segundo para atualizar o primeiro
			clone2.change(function(){
				$this.val(deflate(clone2.val()));
			});

			if (addClass)
				clone2.addClass(addClass);
			if (removeClass)
				clone2.removeClass(removeClass);
				
			// agora adicionamos o segundo elemento
			$this.after(clone2);

			// e entao substituimos o original pelo seu clone de outro tipo
			// precisamos fazer assim porque o IE não aceita sobrescrever o type,
			// mesmo quando não está associado à DOM
			$this.replaceWith('<input type="hidden" name="'+$this.attr('name')+'" id="'+$this.attr('id')+'">');
			$this = $('#' + $this.attr('id'));
			$this.val(value);
			
		});
	};
})(jQuery);