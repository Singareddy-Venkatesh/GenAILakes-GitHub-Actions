import React, { useState } from 'react';
import { useRouter } from 'next/router';

const styles = {
  uploadArea: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  navBar: {
    width: '100%',
    padding: '10px 0',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginBottom: '20px',
  },
  navItem: {
    margin: '0 10px',
    fontSize: '14px',
    color: '#4A4A4A',
    fontWeight: '400',
  },
  activeNavItem: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  dottedRectangle: {
    border: '2px dotted #000000',
    width: '1050px',
    height: '268px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '20px',
    position: 'relative',
  },
  fileInput: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
  },
  instructionText: {
    color: '#4A4A4A',
    fontSize: '16px',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: '5px',
  },
  resolutionText: {
    color: '#4A4A4A',
    fontSize: '14px',
    fontWeight: '400',
    textAlign: 'center',
  },
};

function UploadImage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      alert(`Selected image file name is ${file.name}`);
      console.log("File selected:", file);
    }
  };

  const handlePreviewClick = () => {
    router.push('/Adformat'); // Navigate to AdFormat page instead of index
  };

  const handleNextClick = () => {
    router.push('/Preview'); // Navigate to Preview.js page when Next is clicked
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 flex flex-col items-center py-6">
      <div className="w-full max-w-6xl px-6 mb-4">
        {/* Navigation Bar */}
        <nav style={styles.navBar}>
          <span style={styles.navItem}>Details</span>
          <span style={styles.navItem}>&gt; &nbsp; Ad Format</span>
          <span style={{ ...styles.navItem, color:'#4CAF50' }}>&gt; &nbsp; Upload Assets</span>
          <span style={{ ...styles.navItem, color:'#000000' }}>
            &gt; &nbsp; Preview & Launch
          </span>
        </nav>

        {/* Upload Area */}
        <div style={{ paddingTop: "20px", paddingBottom:"20px" }}>
          <div style={styles.uploadArea}>
            <div style={styles.dottedRectangle}>
              <span style={styles.uploadTextStyle}>Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={styles.fileInput}
              />
              <span style={styles.instructionText}>
                Click or Drag and Drop to add a JPEG, PNG.
              </span>
              <span style={styles.resolutionText}>
                Recommended resolution: 11519 x 46000 pixels.
              </span>
            </div>
          </div>

          {/* Buttons positioned directly under the dotted rectangle towards right side */}
          <div className="mt-4 flex justify-end w-full space-x-4"> 
            <button 
              className="bg-purple-200 text-purple-600 px-6 py-2 rounded-lg shadow hover:bg-purple-300 flex items-center transition"
              onClick={handlePreviewClick}
            >
              <i className="fas fa-arrow-left mr-2"></i> Preview
            </button>
            <button 
              className="bg-purple-500 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-600 flex items-center transition"
              onClick={handleNextClick}
            >
              Next <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadImage;