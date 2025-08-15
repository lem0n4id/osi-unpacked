import { SiHttpie } from 'react-icons/si';
import {
  VscLock,
  VscSync,
  VscSplitHorizontal,
  VscGlobe,
  VscCircuitBoard,
  VscRadioTower,
} from 'react-icons/vsc';

export const LAYERS = [
  {
    id: 7,
    name: 'Application',
    shortDesc: 'Human-facing protocols',
    desc: 'The Application layer provides network services directly to user applications. It includes protocols like HTTP for web browsing, SMTP for email, and FTP for file transfer.',
    techNotes: 'This is where data is created. For our story, a user is typing a message in a chat app, which will be sent over HTTP.',
    sample: `POST /chat HTTP/1.1
Host: osi-story.dev
Content-Type: text/plain
Content-Length: 18

Hey, how are you?`,
    Icon: SiHttpie,
  },
  {
    id: 6,
    name: 'Presentation',
    shortDesc: 'Data formatting & encryption',
    desc: 'This layer translates, encrypts, and compresses data. It ensures that data sent from the application layer of one system can be read by the application layer of another.',
    techNotes: 'Data is serialized and encrypted (e.g., via TLS). We will visualize the message being converted to a byte stream (ASCII/UTF-8) and then "locked" to represent encryption.',
    sample: {
      plain: 'Hey, how are you?',
      encoded: '48 65 79 2c 20 68 6f 77 20 61 72 65 20 79 6f 75 3f',
    },
    Icon: VscLock,
  },
  {
    id: 5,
    name: 'Session',
    shortDesc: 'Manages connections',
    desc: 'The Session layer establishes, manages, and terminates connections (sessions) between applications. It handles authentication and authorization.',
    techNotes: 'Before data is sent, a connection must be established. We will visualize the TCP three-way handshake (SYN, SYN-ACK, ACK) used to create a reliable session.',
    sample: {
      step1: { name: 'SYN', seq: 0, ack: 0, flags: 'SYN' },
      step2: { name: 'SYN-ACK', seq: 0, ack: 1, flags: 'SYN, ACK' },
      step3: { name: 'ACK', seq: 1, ack: 1, flags: 'ACK' },
    },
    Icon: VscSync,
  },
  {
    id: 4,
    name: 'Transport',
    shortDesc: 'Segmentation & reliability',
    desc: 'This layer provides reliable data transfer between systems. It handles segmentation (breaking data into smaller chunks), flow control, and error correction. TCP and UDP are common protocols here.',
    techNotes: 'The encrypted data is broken into segments. Each segment gets a TCP header with source/destination ports and a sequence number.',
    ports: { src: 49522, dst: 443 },
    segments: [
      { seq: 1, data: '4865792c20686f77' },
      { seq: 17, data: '2061726520796f' },
      { seq: 33, data: '753f' },
    ],
    Icon: VscSplitHorizontal,
  },
  {
    id: 3,
    name: 'Network',
    shortDesc: 'IP addressing & routing',
    desc: 'The Network layer is responsible for logical addressing (IP addresses) and routing packets across different networks to their final destination.',
    techNotes: 'Each segment is encapsulated into a packet with an IP header, containing source and destination IP addresses. Routers use the destination IP to forward the packet.',
    ip: {
      src: '203.0.113.10', // TEST-NET-3
      dst: '198.51.100.25', // TEST-NET-2
    },
    Icon: VscGlobe,
  },
  {
    id: 2,
    name: 'Data Link',
    shortDesc: 'MAC addressing & framing',
    desc: 'This layer handles physical addressing (MAC addresses) and prepares data for physical transmission. It encapsulates packets into frames and handles error detection on the local network.',
    techNotes: 'Each packet is wrapped in a frame with a header containing the source and destination MAC addresses for the *local* network segment (e.g., computer to local router).',
    mac: {
      src: 'A8:5E:45:C4:69:42', // Your computer's NIC
      dst: '00:1A:2B:3C:4D:5E', // Your local router's NIC
    },
    Icon: VscCircuitBoard,
  },
  {
    id: 1,
    name: 'Physical',
    shortDesc: 'The physical medium',
    desc: 'The Physical layer is responsible for the physical transmission of raw data bits over a medium like copper wire, fiber optic cable, or radio waves.',
    techNotes: 'The frame is converted into a stream of bits (1s and 0s) and transmitted as electrical signals, light pulses, or radio waves.',
    sample: '010010000110010101111001...',
    Icon: VscRadioTower,
  },
];
