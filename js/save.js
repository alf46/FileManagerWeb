$(document).ready(function() {
   $('#frm-save').submit(function(event){

        // Obtener el nombre del archivo.
        var filename = $('#txtfilename').val();

        // Obtener el formato del archivo.
        var format = $('#cbxformat').children("option:selected").val();

        var textData = $('#textData').val();

      
      if(filename != '' && format != '' && textData != ''){
        var blob = new Blob([textData], {type:'text/plain;charset=utf-8'});
        saveAs(blob, filename +'.'+ format);
    }
       event.preventDefault();
   });

	$('#btn-getdata').click(function() {
		 try {
            $.ajax({
                url: "http://dummy.restapiexample.com/api/v1/employees",
                type: "GET",
                dataType: 'json',
                error: function (xhr, text, status) {
                    alert("Error obteniendo los datos: " + xhr + ", " + text + ", status=" + status);
                },
                success: function (result) {
                	
                	console.log(JSON.stringify(result));
                    // var sel = $("#idCiudad");
                    // sel.empty();

                    // $.each(result, function (i, item) {
                    //     $(sel).append('<option value="' + item.IdCiudad + '">' + item.Nombre + '</option>');
                    // });
                }
            });
        } catch (e) {
            alert("Error: " + e.toString());
        }		
	});;
});