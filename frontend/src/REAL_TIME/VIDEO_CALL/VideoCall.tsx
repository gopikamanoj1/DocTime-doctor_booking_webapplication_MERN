import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useRef, useEffect } from 'react'; // Import useRef and useEffect
import axiosInstance from '../../AxiosConfig/axiosInstance';

const VideoCall = () => {
    let { roomId,appoinmentId }: any = useParams();
    const containerRef = useRef(null);

    let userID: string;
  let userName: string;
  const userData :any= useSelector((state: any) => state.persisted.auth.user);
  const doctordata:any = useSelector((state: any) => state.persisted.doctorAuth);
  



  
  if (userData && userData._id && userData.name) {
    userID = userData._id
    userName = userData.name
  } else if (doctordata && doctordata.doctor._id && doctordata.doctor.name) {
    userID = doctordata.doctor._id
    userName = doctordata.doctor.name
  } else {
   
    userID = "Unknown ID";
    userName = "Unknown Name";
  }

    const navigate = useNavigate();
    
    const handleLeaveRoom = async () => {
        if(userData){
            
            navigate(`/appointmentDetails`);
        }else if(doctordata){
            const data={
                appoinmentId
            }
            const response= await axiosInstance.post('/api/auth/handleLeave',data)
            
            if(response && response?.data?.status){
                navigate(`/showDoctorAppoinment`);
            }else{
                console.log(response?.data?.message,'ERROR HAPPENCE IN THE showDoctorAppoinment');
            }
           
        }
        
    }

    useEffect(() => {
        if (!containerRef.current) return; 
        const MyVideoCallMeet = async () => { 
            try {
                const appID = 1572262945;
                const serverSecret = "67e7a55fac65e4f9f734be40d97a9bce";
                const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest( 
                    appID,
                    serverSecret,
                    roomId,
                    Date.now().toString(),
                    userName
                );
              
                
                const zp = ZegoUIKitPrebuilt.create(kitToken);
               
                
                zp.joinRoom({
                    container: containerRef.current,
                    scenario: {
                        mode: ZegoUIKitPrebuilt.GroupCall
                    },
                    turnOnCameraWhenJoining: true,
                    turnOnMicrophoneWhenJoining: true,
                    onLeaveRoom: handleLeaveRoom
                });
            } catch (error) {
                console.error('Error generating kit token:', error);
            }
        }
        MyVideoCallMeet(); // Call MyVideoCallMeet with the ref element
    }, [roomId, userID, userName, navigate]);

    return (
        <>
            <div className="w-full h-full" ref={containerRef} />
        </>
    );
}

export default VideoCall;