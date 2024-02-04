import React, { useEffect, useState } from 'react'
import "./Meetings.css";
import { FieldValue, addDoc, arrayUnion, collection, doc, getDoc, getDocs, increment, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from './firebase-config';

export default function Meetings(user) {

  const [listMeetings, setListMeetings] = useState([]);
  const [registerTitle, setRegisterTitle] = useState("");
  const [registerDescription, setRegisterDescription] = useState("");

  /*Obtener todos los meetings*/

  /*Unirse a un meeting*/
  const joinMeeting = async (meeting) => {
    try {
      const meetingRef = doc(db, "meetings", meeting.id);
      await updateDoc(meetingRef, {
        participants: arrayUnion(auth.currentUser.uid),
        participantsNumber: increment(1)
      });
      updateCurrentUserJoin(meeting.id);
    }
    catch (error) {
      console.error("Error fetching meetings:", error);
    }
  }

  /*Crear un meeting*/
  const createMeeting = async () => {
    try {
      const meetingData = {
        title: registerTitle,
        description: registerDescription,
        organizerUid: auth.currentUser.uid,
        participantsNumber: 1,
        participants: [auth.currentUser.uid]
      };
      const meetingRef = await addDoc(collection(db, "meetings"), meetingData);
      updateCurrentUserCreate(meetingRef.id)
    }
    catch (error) {
      console.error("Error fetching meetings:", error);
    }

  }

  const updateCurrentUserCreate = async (meetingId) => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, {
      "myMeetings": arrayUnion(meetingId),
      "meetings": arrayUnion(meetingId)
    })
  }

  const updateCurrentUserJoin = async (meetingId) => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, {
      "meetings": arrayUnion(meetingId)
    })
  }


  const displayFormCreateMeeting = () => {
    return (
      <div className="modal fade" id="newMeeting" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Titulo:
              <input
                type="text"
                value={registerTitle}
                onChange={(event) => { setRegisterTitle(event.target.value); }}
              />
              Descripcion:
              <input
                type="text"
                value={registerDescription}
                onChange={(event) => { setRegisterDescription(event.target.value); }}
              />
              Ubicacion:
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={createMeeting}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

    )

  }


  useEffect(() => {

    const getAllMeetings = async () => {
      try {
        const meetings = await getDocs(collection(db, "meetings"));
        const meetingsData = meetings.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (user.user === null) {
          setListMeetings(meetingsData);
        } else {
          const meetingsDataFilter = meetings.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(doc => !doc.participants.includes(auth.currentUser.uid));
          setListMeetings(meetingsDataFilter);
        }
      }
      catch (error) {
        console.error("Error fetching meetings:", error);
      }
    }
    getAllMeetings();
  }, [user, listMeetings]);


  return (
    <section id='meetings'>
      <div className='container'>
        <button data-bs-toggle="modal" data-bs-target="#newMeeting">Crear reunion</button>
        {displayFormCreateMeeting()}
        <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-4">
          {listMeetings.map(meeting =>
            <div className="col" key={meeting.id}>
              <div className="card">
                <div className="card-body">
                  Titulo: <h5 className="card-title">{meeting.title}</h5>
                  Organizador: <p className="card-text">{meeting.organizerUid}</p>
                  <button type='submit' onClick={() => joinMeeting(meeting)}>Unirse</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
