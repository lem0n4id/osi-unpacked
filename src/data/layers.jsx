import React from 'react';
import {
  VscBroadcast,
  VscCircuitBoard,
  VscGlobe,
  VscLock,
  VscMail,
  VscRss,
  VscSync,
} from 'react-icons/vsc';

export const LAYERS = [
  {
    id: 7,
    name: 'Application',
    shortDesc: 'Human-computer interaction layer, where applications can access the network services.',
    desc: 'The Application Layer provides the interface for applications to access network services. This is what the user sees, like web browsers (HTTP), email clients (SMTP), and file transfer programs (FTP).',
    techNotes: 'Our visualization shows a messaging app sending a simple text message. The data is a standard HTTP POST request.',
    sample: `POST /api/message HTTP/1.1
Host: osi-story.dev
Content-Type: text/plain
Content-Length: 12

Hello World!`,
    Icon: ({ className }) => <VscMail className={className} />,
  },
  {
    id: 6,
    name: 'Presentation',
    shortDesc: 'Ensures that data is in a usable format and is where data encryption occurs.',
    desc: 'The Presentation Layer translates data between the application and the network formats. It handles character encoding (like ASCII to UTF-8), data compression, and encryption/decryption.',
    techNotes: 'Here, the plain text "Hello World!" is encoded into hexadecimal representation. We also signify that TLS encryption would happen at this layer.',
    sample: {
      plain: 'Hello World!',
      encoded: '48 65 6c 6c 6f 20 57 6f 72 6c 64 21',
    },
    Icon: ({ className }) => <VscLock className={className} />,
  },
  {
    id: 5,
    name: 'Session',
    shortDesc: 'Manages the dialogue between computers, establishing, managing, and terminating connections.',
    desc: 'The Session Layer establishes, manages, and terminates connections between applications. It handles session checkpointing, and recovery.',
    techNotes: "To visualize session establishment, we're showing the TCP three-way handshake (SYN, SYN-ACK, ACK). While technically a Layer 4 process, it's a classic way to represent the start of a reliable session.",
    sample: {
      step1: { name: 'SYN', Seq: 0, Ack: 0 },
      step2: { name: 'SYN-ACK', Seq: 0, Ack: 1 },
      step3: { name: 'ACK', Seq: 1, Ack: 1 },
    },
    Icon: ({ className }) => <VscSync className={className} />,
  },
  {
    id: 4,
    name: 'Transport',
    shortDesc: 'Provides reliable, end-to-end data transfer and error correction between hosts.',
    desc: 'The Transport Layer provides reliable, end-to-end communication services. It segments data from the session layer and reassembles it on the receiving end. TCP (reliable) and UDP (fast) are key protocols here.',
    techNotes: 'The encrypted data is broken into smaller TCP segments. Each segment gets a source and destination port number, plus a sequence number for reassembly.',
    sample: {
      ports: {
        src: '49522', // Ephemeral port
        dst: '443',   // HTTPS
      },
      segments: [
        { seq: 1, data: '48656c6c' },
        { seq: 2, data: '6f20576f' },
        { seq: 3, data: '726c6421' },
      ],
    },
    Icon: ({ className }) => <VscRss className={className} />,
  },
  {
    id: 3,
    name: 'Network',
    shortDesc: 'Responsible for packet forwarding including routing through intermediate routers.',
    desc: 'The Network Layer is responsible for logical addressing and routing. It determines the best path for data to travel from source to destination across multiple networks (internetworking).',
    techNotes: 'Each segment is encapsulated into a packet with an IP header, containing source and destination IP addresses from a TEST-NET range for realism.',
    sample: {
      ip: {
        src: '203.0.113.10', // RFC 5737 TEST-NET-3
        dst: '198.51.100.25', // RFC 5737 TEST-NET-2
      },
    },
    Icon: ({ className }) => <VscGlobe className={className} />,
  },
  {
    id: 2,
    name: 'Data Link',
    shortDesc: 'Provides node-to-node data transfer and error detection from the physical layer.',
    desc: 'The Data Link Layer provides reliable data transfer across a single physical network link. It handles framing, physical addressing (MAC addresses), and error detection.',
    techNotes: 'Each packet is encapsulated into a frame with a MAC header, containing the hardware addresses of the source and destination network interface cards (NICs).',
    sample: {
      mac: {
        src: '00:1A:2B:3C:4D:5E',
        dst: '66:77:88:99:AA:BB',
      }
    },
    Icon: ({ className }) => <VscCircuitBoard className={className} />,
  },
  {
    id: 1,
    name: 'Physical',
    shortDesc: 'Responsible for the transmission and reception of unstructured raw data.',
    desc: 'The Physical Layer is responsible for the physical transmission of raw data bits over a medium like copper wire, fiber optic cable, or air. It defines voltages, frequencies, and pin-outs.',
    techNotes: 'The Ethernet frames are converted into a stream of electrical signals (1s and 0s) and transmitted across the physical cable.',
    sample: {
      bits: '01010101 01100001 01101100 01100001 01101110 01100100',
    },
    Icon: ({ className }) => <VscBroadcast className={className} />,
  },
];
