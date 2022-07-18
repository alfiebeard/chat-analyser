import Dropzone from 'react-dropzone';
import { sendFiles } from "../utils/fileUploadUtils";

const DragAndDropDirectory = (props) => {
  return (
    <Dropzone onDrop={acceptedFiles => sendFiles(acceptedFiles, props.setDataLoaded)}>
      {({getRootProps, getInputProps}) => (
        <section style={{"border": "1px black dashed"}}>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </section>
      )}
    </Dropzone>
  )
};

export default DragAndDropDirectory