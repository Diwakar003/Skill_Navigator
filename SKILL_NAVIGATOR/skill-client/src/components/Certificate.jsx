import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Certificate = ({ name = "Albert Simion S", course = "Java" }) => {
  const certificateRef = useRef(null);

  const handleDownload = () => {
    const certificate = certificateRef.current;

    html2canvas(certificate, {
      scale: 2, // Increase scale for better clarity
      useCORS: true // Avoid CORS issues for external images
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${name}_certificate.pdf`);
    });
  };

  return (
    <div className="flex flex-col items-center mt-10 relative">

      {/* Outer container with gradient background and slanted lines */}
      <div
        ref={certificateRef}
        className="relative w-[1024px] h-[768px] bg-gradient-to-tr from-purple-800 to-blue-700 p-8"
      >
        {/* Thicker slanting lines in the background */}
        <div className="absolute bottom-0 left-[-100px] w-[300px] h-[900px] bg-blue-400 transform rotate-[45deg] -z-10"></div>
        <div className="absolute top-0 right-[-100px] w-[300px] h-[900px] bg-blue-400 transform rotate-[45deg] -z-10"></div>

        {/* Certificate box */}
        <div className="relative bg-white border-[10px] border-yellow-500 shadow-xl w-full h-full p-8 flex flex-col justify-between">
          {/* Corner triangles for design */}
          <div className="absolute top-0 left-0 w-[100px] h-[100px] bg-yellow-600"></div>
          <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-blue-600"></div>
          <div className="absolute bottom-0 left-0 w-[100px] h-[100px] bg-blue-600"></div>
          <div className="absolute bottom-0 right-0 w-[100px] h-[100px] bg-yellow-600"></div>

          {/* Hexaware logo */}
          <div className="absolute top-4 right-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Hexaware_new_logo.svg/768px-Hexaware_new_logo.svg.png?20201230064751"
              alt="Hexaware Logo"
              className="h-14"
            />
          </div>

          {/* Badge image on the top left */}
          <div className="absolute top-4 left-4">
            <img
              src="https://png.pngtree.com/png-vector/20221109/ourmid/pngtree-red-gold-badge-png-image_6427773.png"
              alt="Award Ribbon"
              className="h-14"
            />
          </div>

          {/* Title and Completion Message */}
          <div className="text-center">
            <h1 className="text-3xl font-bold">CERTIFICATE</h1>
            <h2 className="text-lg font-medium">OF COMPLETION</h2>
            <p className="text-md font-semibold mt-2">
              THIS CERTIFICATE IS PROUDLY AWARDED TO
            </p>
            {/* Name of Recipient */}
            <h2 className="text-2xl font-bold text-red-600 mt-2">
              {name}
            </h2>
          </div>

          {/* Congratulatory message */}
          <div className="text-center mt-6 text-sm">
            <p>
              Congratulations on successfully completing the {course} course!
            </p>
            <p>Your perseverance and passion for learning are truly commendable.</p>
            <p>We hope this certification empowers you to reach even greater heights.</p>
          </div>

          {/* Footer and Signatories */}
          <div className="flex justify-between mt-8">
            <div className="text-center text-sm">
              <p className="font-bold">Diwakar</p>
              <p>Hexaware CEO</p>
            </div>
            <div className="text-center text-sm">
              <p className="font-bold">Dhaya Kumar</p>
              <p>VP-STG</p>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button below the certificate */}
      <button
  onClick={handleDownload}
  className="mt-6 bg-blue-600 text-white p-3 rounded transition-transform duration-300 hover:scale-105 hover:bg-blue-500"
>
  Download Certificate
</button>
    </div>
  );
};

export default Certificate;
