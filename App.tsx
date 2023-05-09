import React, { useState } from 'react';
import DocumentPicker from 'react-native-document-picker';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';



const App = () => {

  const [singleFile, setSingleFile] = useState(null);
  const [urlservidor, setUrlservidor] = useState('http://192.168.0.131/demoServerReact/index.php');

  const uploadImage = () => {
    // Si se selecciono un archivo
    if (singleFile != null) {
      // Preparamos FormData para enviar
      const fileToUpload = singleFile[0];
      const data = new FormData();
      data.append('name', 'Archivo_cargando');
      data.append('file_attachment', fileToUpload);
      // Enviamos el archivo al servidor
      fetch(urlservidor,{
          method: 'post',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      ).then((data) => {
        //Parseamos la respuesta a json
        return data.json()
      }).then( (finalData) => {
        //Verificamos y mostramos resultado
        alert((finalData.status == '1' ? "Listo: ":"Error: ") + finalData.msg)
      });
      
    } else {
      // Si no se selecciono un archivo 
      alert("Primero selecciona el archivo a subir")
    }
  };

  const selectFile = async () => {
    // Abrimos el picker para seleccionar archivo
    try {
      const res = await DocumentPicker.pick({
        // Intercambiar segun el tipo de archivo a subir
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.pdf
        // DocumentPicker.types.images
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.audio
        // DocumentPicker.types.plainText
      });
      // Mostramos error en consola 
      console.log('res : ' + JSON.stringify(res));
      // Asigamos el valor del archivo a la variable singleFile
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Verificamos el posible tipo de error
      if (DocumentPicker.isCancel(err)) {
        // Si el usuario no selecciono nada
        alert("Operación cancelada")
      } else {
        // Para otros errores
        alert("Error inesperado: " + JSON.stringify(err))
        throw err;
      }
    }
  };
  return (
    <View style={styles.mainBody}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 30, textAlign: 'center' }}>
          Carga de archivos con React Native
        </Text>
        <TextInput onChangeText={newText => setUrlservidor(newText)} 
                    defaultValue={urlservidor}
                    placeholder='Url del servidor'
                    style={styles.estilosInputServidor}/>
        
    
      </View>
      {/*Mostramos el status del archivo*/}
      {singleFile != null ? (
        <Text style={styles.textStyle}>
          File Name: {'\n'} {singleFile[0].name ? singleFile[0].name : ''}
          {'\n'}
          Type: {'\n'} {singleFile[0].type ? singleFile[0].type : ''}
          {'\n'}
        </Text>
      ) : null}
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={selectFile}>
        <Text style={styles.buttonTextStyle}>Select File</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={uploadImage}>
        <Text style={styles.buttonTextStyle}>Upload File</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    justifyContent: 'center',
    flex: 1,
    padding: 20,
  },
  buttonStyle: {
    borderWidth: 0,
    backgroundColor: '#307ecc',
    borderColor: '#307ecc',
    color: '#FFFFFF',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 30,
    height: 40,
    marginRight: 35,
    marginLeft: 35,
  },
  buttonTextStyle: {
    fontSize: 16,
    paddingVertical: 10,
    color: '#FFFFFF',
  },
  textStyle: {
    backgroundColor: '#fff',
    marginRight: 35,
    marginTop: 16,
    marginLeft: 35,
    fontSize: 15,
    textAlign: 'center',
  },
  estilosInputServidor: {
    borderWidth: 0.1, 
    borderBottomWidth: 2, 
    borderBottomColor: 'green', 
    width: '90%',
    borderRadius: 12,
    marginTop: 5
  }
});

export default App;