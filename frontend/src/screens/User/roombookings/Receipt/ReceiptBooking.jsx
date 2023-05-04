import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Converter, hiIN } from 'any-number-to-words';
import { useNavigation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../../../Admin/Reciept/cashrecipt.css';
import './ReceiptBooking.css';
const converter = new Converter(hiIN);
const ReceiptBooking = ({}) => {
  const location = useLocation();
  const componentRef = useRef();
  const [isData, setisData] = React.useState('');
  const [dharamshalaname, setdharamshalaname] = useState('');
  const [checkinda, setcheckinda] = useState('');
  console.log('data from certifucate', isData, dharamshalaname, checkinda);

  const navigation = useNavigate();

  function printDiv() {
    navigation('/admin-panel/reports/printcontent', {
      state: {
        data: isData,
      },
    });
  }

  function down() {
    console.log('cliii');
    const input = document.getElementById('receipt');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4', false);
      pdf.addImage(imgData, 'PNG', 0, 0, 600, 0, undefined, false);
      pdf.save('download.pdf');
    });
  }

  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date(isData && isData[0]?.coutDate);
  const currDate = today
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  useEffect(() => {
    if (location.state) {
      setisData(location?.state?.data?.data);
      setcheckinda(location?.state?.checkindata);
      setdharamshalaname(location?.state?.categoryname);
    }
  }, []);

  return (
    <>
      <div>
        <div
          className="button_div_print_download"
          style={{ marginBottom: '1rem' }}
        >
          <button onClick={() => navigation('/')}>Back</button>

          <div />
        </div>
        <div style={{ padding: '1rem' }} ref={componentRef}>
          <div className="main-certificate" id="receipt">
            <div className="topinfo-flex">
              <p>E-mail:badebaba.kundalpur@gmail.com</p>
              <p>॥ श्री बड़े बाबा नम:॥</p>
              <p>Web:www.shreebadebaba.com</p>
            </div>
            <div className="main-head">
              <div className="main-head-container">
                <span className="hessaxxd-sn"></span>
                <span className="head-name">
                  <h2>श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि</h2>
                  <p>(सार्व, न्यास क्रं. 17 - ह)</p>
                  <h4>पिनकोड - 470773, तहसील पटेरा, जिला-दमोह (म.प्र.)</h4>
                </span>
                <span className="main-headmain-head-containerhead-contact">
                  <p>+91-7771835891</p>
                  <p>+91-7771834880</p>
                </span>
              </div>
            </div>
            <div className="reciptimg">
              <div className="reciptbody" style={{ padding: '0px' }}>
                <div className="bankjankari">
                  <div className="main_room_receipt10">
                    <div
                      className="prinht_ddd"
                      id="receipt"
                      ref={componentRef}
                      style={{ width: '100%' }}
                    >
                      <div className="maxxin_room_receipt_innear">
                        <p className="yadda_text lineheight">
                          यात्री आगमन रसीद
                        </p>
                        <div className="innear_div_texx">
                          <div className="innear_div_texx_dd">
                            <div>
                              <p className="lineheight">आवास क्र</p>
                              <p className="lineheight">यात्री का नाम-</p>
                              <p className="lineheight">पिता/पति श्री-</p>
                            </div>
                            <div>
                              <p className="lineheight">
                                {isData &&
                                  isData.map((item) => {
                                    return <span> {item?.RoomNo}</span>;
                                  })}
                              </p>
                              <p className="lineheight">
                                {isData && isData[0]?.name}
                              </p>
                              <p className="lineheight">
                                {isData && isData[0]?.Fname}
                              </p>
                            </div>
                          </div>
                          <div className="innear_div_texx_dd">
                            <div>
                              <p className="lineheight">आगमन दिनांक</p>
                              <p className="lineheight">मोबाईल न.-</p>
                              <p className="lineheight">पता-</p>
                            </div>
                            <div>
                              <p className="lineheight">
                                {currDate} / {currTime}
                              </p>
                              <p className="lineheight">
                                {isData && isData[0]?.contactNo}
                              </p>
                              <p className="lineheight">
                                {isData && isData[0]?.city}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="yyy_text_div">
                          <p className="lineheight">यात्री संख्या</p>
                          <p className="lineheight">
                            Male: {isData && isData[0]?.male}
                          </p>
                          <p className="lineheight">
                            Female: {isData && isData[0]?.female}
                          </p>
                          <p className="lineheight">
                            Child: {isData && isData[0]?.child}
                          </p>
                          <p className="lineheight">
                            Total:{' '}
                            {Number(isData && isData[0]?.male) +
                              Number(isData && isData[0]?.female) +
                              Number(isData && isData[0]?.child)}
                          </p>
                        </div>

                        <div>
                          <table className="table_ddd">
                            <tbody>
                              <tr>
                                <td className="table_tddd lineheight">
                                  धर्मशाला नाम
                                </td>
                                <td className="table_tddd lineheight">
                                  रूम टाईप
                                </td>
                                {/* <td className="table_tddd">रूम सुंविधाएं</td> */}
                                <td className="table_tddd lineheight">
                                  रुम न.
                                </td>
                                {/* <td className="table_tddd">रूम की संख्या</td> */}
                                <td className="table_tddd lineheight">
                                  सहयोग राशि
                                  <p className="lineheight">
                                    {isData &&
                                      isData[0]?.nRoom &&
                                      isData[0]?.nRoom}{' '}
                                    X
                                    {isData &&
                                      isData[0]?.roomAmount &&
                                      isData[0]?.roomAmount}
                                  </p>
                                </td>
                                {/* <td className="table_tddd">
                            अमानत राशि
                            <p>
                              {isData && isData[0]?.nRoom && isData[0]?.nRoom} X
                              {isData &&
                                isData[0]?.roomAmount &&
                                isData[0]?.roomAmount}
                            </p>
                          </td> */}
                              </tr>
                              <tr>
                                <td className="table_tddd lineheight">
                                  {checkinda && checkinda?.dharamshala}
                                </td>
                                <td className="table_tddd lineheight">
                                  {checkinda &&
                                    checkinda?.category[0]?.facilities &&
                                    checkinda?.category[0]?.facilities.map(
                                      (element, index) => (
                                        <span key={index}> {element}</span>
                                      ),
                                    )}
                                  ,
                                  {checkinda &&
                                    checkinda?.category[0]?.category_name}
                                </td>
                                {/* <td className="table_tddd">
                                {checkinda &&
                                  checkinda?.category[0]?.facilities &&
                                  checkinda?.category[0]?.facilities.map(
                                    (element, index) => (
                                      <span key={index}> {element},</span>
                                    ),
                                  )}
                              </td> */}
                                <td className="table_tddd lineheight">
                                  (
                                  {isData &&
                                    isData.map((item) => {
                                      return <span> {item?.RoomNo},</span>;
                                    })}{' '}
                                  )
                                </td>
                                {/* <td className="table_tddd">
                                {isData && isData[0]?.nRoom}
                              </td> */}
                                <td className="table_tddd lineheight">
                                  {Number(isData && isData[0]?.roomAmount) *
                                    Number(isData && isData[0]?.nRoom)}
                                </td>
                                {/* <td className="table_tddd">
                            {Number(isData && isData[0]?.roomAmount) *
                              Number(isData && isData[0]?.nRoom)}
                          </td> */}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="note_text">
              <p>
                नोट : रूम चेक आउट समय 24 घंटे के पश्चात दूसरे दिन का चार्ज मान्य
                होगा। रूम केन्सिल एवं बदलने का समय 1 घंटे रहेगा ।
              </p>
            </div>
            <div className="main-certificatenote">
              <h2 className="h2text">
                ऑनलाईन आवास व्यवस्था हेतु नियम/सावधानियां
              </h2>
              <p>1. कमरे खुले न छोड़े, स्वयं के ताले उपयोग करें।</p>
              <p>
                2. प्रस्थान से 1 घंटे पूर्व अपनी पर्ची (कमरे) का पूर्ण हिसाब कर
                लेवें।
              </p>
              <p>
                3. आवासीय इकाइयों के सभी कमरों में गैस स्टोव / सिगड़ी का प्रयोग
                वर्जित है।
              </p>
              <p>
                4. अनजान व्यक्तियों से किसी भी प्रकार की खाद्य सामग्री न खरीदें
                अधिकृत दुकानों से ही लें
              </p>
              <p>
                5. कार्यरत कर्मचारियों को किसी भी प्रकार का ईनाम या प्रलोभन देकर
                व्यवस्था खराब न करें।
              </p>
              <p>
                6. अमानत / सहायता राशि 24 घंटों के लिये है। इसके बाद कृपया पुनः
                अमानत राशि जमा करायें।
              </p>
              <p>
                7. यात्रीगण को जारी सामग्री यदि खो/ टूटफूट जाती है तो नियमानुसार
                राशि जमा करानी होगी।
              </p>
              <p>
                8. आवास खाली करते समय धर्मशाला इंचार्ज (चौकीदार) के हस्ताक्षर
                पर्ची पर लाने का कष्ट करें।
              </p>
              <p>
                9. क्षेत्रीय भवन, आवासीय परिसर की पूर्व बुकिंग ऑनलाईन / दूरभाष
                से नहीं होती है। अतः कार्यरत कर्मचारियों पर अनावश्यक दबाव न
                बनायें।
              </p>
              <p>
                10. यात्रीगण अपने अमूल्य सुझाव श्री दिगम्बर जैन सिद्ध क्षेत्र
                कुण्डलगिरि के अध्यक्ष/महामंत्री को लिखित में उप कार्यालय दमोह को
                प्रेषिक कर सकते है।
              </p>
              <p>
                11. 3 दिन से अधिक ठहरने हेतु प्रबंधक /प्रबंधक एवं 7 दिन से अधिक
                ठहरने हेतु महामंत्री / अध्यक्ष जी से लिखित स्वीकृति आवाश्यक है।
              </p>
              <p>
                12. आवासीय इकाइयों में साफ सफाई रखें एवं पॉलिथिन का प्रयोग न
                करें एवं आवश्यकता न होने पर नल, बिजली एवं अन्य उपकरण बंद रख कर
                सहयोग करें।
              </p>
              <p>
                13. आवास लेते समय परिवार के 1 ही सदस्य लाईन में रहें। आवास
                प्रतीक्षा सूची के क्रम में दिये जायेंगे। प्रतीक्षा सूची के समय
                पर स्वागत कक्ष में उपस्थित रहने का कष्ट करें।
              </p>
              <p>
                14. आवास में धर्म विरूद्ध कार्य होते पाए जाने पर आवास तुरंत खाली
                करवाने हेतु प्रबंधक को पूर्ण अधिकारी हैं। यह
                धार्मिक/सिद्धक्षेत्र है इसकी पवित्रता बनाये रखें।
              </p>
              <p>
                15. आवासीय इकाईयों में यदि किसी भी प्रकार के नल/बिजली/सफाई आदि
                संबंधित कोई भी समस्या हो तो कमरा बुक करवाने को एक घंटे के अंदर
                कमरा चेंज करवा लेवें। अन्यथा फिर 1 घंटे के बाद कमरा चेंज नहीं
                किया जावेगा, एवं नियमानुसार सहायता शुल्क देय होगा ।
              </p>
              <div className="absolute_text">
                <p>
                  क्षेत्र में हो रहे निर्माण कार्य की जानकारी आप कार्यालय से
                  प्राप्त । कर सकते है एवं दान राशि क्षेत्र के बैंक खातों में भी
                  जमा करा सकते है।
                </p>
              </div>
            </div>
            <div className="reciept-footer-style">
              <p>
                मोबाईल : +91-7771834880, +91-7771835891 पर कार्यदिवस में संपर्क
                कर सकते हैं।
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="button_div_print_download">
        <button onClick={() => down()}>Download</button>
        <button onClick={() => navigation('/bookinghistory')}>
          Booking History
        </button>
      </div>
    </>
  );
};

export default ReceiptBooking;
