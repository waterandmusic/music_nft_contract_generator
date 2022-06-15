import { ReactElement } from "react";
import styled from "styled-components";

enum Type {
  multipleChoice,
  text,
  bigText,
  endpointFail,
  endpointSuccess,
}

const EducationPoint = styled.div`
  background:#faf7f7;
  border-radius: 5px;
  border-left: 3px solid #ffef9c;
  padding: 10px 20px;

  a {
    color: #3498db;
  }

  .ReadMore{
    margin:12px;
    background-color: rgba(0,0,0,0);
    font-weight: bold;
    color: blue;
    border: none;
    text-align: center;
    // text-decoration: none;
    font-size: 17px;
    cursor: pointer;
    transition: .3s;
  }
  .ReadMore:hover{
    color: black;
  }
  .ExtendedContent {
    // padding: 0 18px;
    opacity: 0;
    // background-color: white;
    max-height: 0;
    overflow: hidden;
    transition: max-height .2s ease-out, opacity .8s ease-out;
  }
`;

const readMore = (e: React.MouseEvent<HTMLButtonElement>) => {
  // console.log('checked')
  const button = (e.target as HTMLButtonElement)
  const content = (button.nextSibling as HTMLElement)

  if (content.style.maxHeight !== `${content.scrollHeight}px`) {
    content.style.maxHeight = `${content.scrollHeight}px`
    content.style.opacity = '1'
    
    button.textContent = 'Read Less'
  } else {
    content.style.maxHeight = '0px'
    content.style.opacity = '0'
    button.textContent = 'Read More'
  }
}

const tree: {
  [key: string]: {
    question: string | ReactElement;
    information?: string | ReactElement;
    type: Type;
    required?: boolean;
    options?: { text: string }[];
    next?: string | string[];
  };
} = {
  "0": {
    question: "Welcome to the NFT Contract Builder.",
    information: (
      <div>
        <p>
          We'll ask you a series of questions to help you build an agreement for
          your music NFT. Just click the button to get started. To navigate back
          and change a previous answer, click on the previous question above
          (text in gray).
        </p>
        <p>
          For the time being, this contract template is meant only for artists
          who:
        </p>
        <ul>
          <li>are U.S. residents,</li>
          <li>
            are minting an NFT where the artist is the sole owner of both the
            song and artwork connected to the NFT, and
          </li>
          <li>
            are granting buyers a non-commercial license to use and display the
            NFT, without any other “real world” or financial benefits attached.
          </li>
        </ul>
        <p>
          We hope to expand on the use cases covered in this framework in future
          iterations.
        </p>
        <p>
          <b>
            DISCLAIMER: Our intention is to provide a platform for legal
            information and self-help. The information given in this service is
            provided for your private use and does not constitute legal advice.
            We do not review any information you provide us for legal accuracy
            or sufficiency, draw legal conclusions, provide opinions about your
            usage, or apply the law to the facts of your situation.
          </b>
        </p>
        <p>
          <b>
            If you need legal advice for a specific problem, you should consult
            with a licensed attorney. Legal information provided by this service
            is not a substitute for legal advice from a qualified attorney
            licensed to practice in an appropriate jurisdiction.
          </b>
        </p>
        <p>
          <b>
            This contract is limited to the laws of the United States because we
            are not experts in foreign intellectual property law. If you are,
            please get in touch at research@waterandmusic.com to help us with
            this project.
          </b>
        </p>
      </div>
    ),
    type: Type.multipleChoice,
    options: [
      {
        text: "Get started",
      },
    ],
    next: "1",
  },
  "1": {
    question: "Who is the artist in this agreement?",
    required: true,
    type: Type.text,
    next: "2",
  },
  "2": {
    question: "What's the name of the NFT you are minting?",
    required: true,
    type: Type.text,
    next: "3",
  },
  "3": {
    question: "Where are you auctioning it (i.e. on which Platform)?",
    required: true,
    type: Type.text,
    next: "4",
  },
  "4": {
    question:
      "Did you create the visual Artwork in the NFT? Are you the artist?",
    type: Type.multipleChoice,
    options: [
      {
        text: "Yes",
      },
      {
        text: "No",
      },
    ],
    next: ["5", "6"],
  },
  "5": {
    question:
      "Is there a musical composition (and recorded performance of that composition) attached to the NFT?",
    information: (
      <EducationPoint>
        <h2>Some things to consider:</h2>
        <h3>Sound Recording vs. Composition</h3>
        <p>
          This is important because there are two copyrights in a single song:
          one for the musical composition and one for the sound recording. The
          musical composition is made up of the melody and lyrics that comprise
          the song. The sound recording is the physical embodiment (recording)
          of that song. A good example to think through this distinction is the
          hit song “I Will Always Love You,” which was written by Dolly Parton
          but recorded by Whitney Houston . In this single song, Dolly owned the
          musical composition copyright, but Whitney owned the sound recording
          copyright. If helpful, you could think of the musical composition as
          being represented by Dolly’s notebook page containing all the musical
          notes and lyrics of the song, and the sound recording as the audio
          file itself (Whitney’s CD/Vinyl/mp3 of her studio recording of the
          song). For reference, Dolly estimates she’s written over 3,000 songs,
          and only around 450 of them have been recorded! That means she’s
          holding onto roughly 3,000 musical composition copyrights, but far
          less sound recording copyrights.
        </p>
        <p>
          <a
            href="https://www.copyright.gov/circs/circ56a.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Read More
          </a>
        </p>
        <h3>Off chain media storage</h3>
        <p>
          Storing data or files directly on the blockchain is a very expensive
          proposition, with the cost for writing larger digital media files to
          the blockchain currently much too high to make it a viable option for
          most NFT projects. In lieu of storing NFT content or media directly on
          the blockchain itself, the media associated with a given NFT is often
          “attached” to the NFT through a pointer embedded in that NFT’s smart
          contract which directs users/viewers/sites to where to find the actual
          media file(s) for playback or display. Sometimes this pointer can be a
          simple URL which directs to where a file is stored, however URLs still
          pose a risk as they point to centralized services which may fail
          across time, leaving NFT owners without a way to access the art that
          they purchased. More commonly, pointers embedded in NFTs point to
          files stored on decentralized data storage systems, such as the
          <a href="https://ipfs.io/" target="_blank" rel="noreferrer">
            {" "}
            InterPlanetary File System (IPFS)
          </a>{" "}
          or
          <a href="https://www.arweave.org/" target="_blank" rel="noreferrer">
            {" "}
            Arweave
          </a>
          , which ensure long-term access to files.
        </p>
      </EducationPoint>
    ),
    type: Type.multipleChoice,
    options: [
      {
        text: "Yes",
      },
      {
        text: "No",
      },
    ],
    next: ["7", "8"],
  },
  "6": {
    question:
      "You might not have the rights to use the artwork unless you properly licensed or purchased it from the original artist. If you're certain you have the rights, or you simply want to continue exploring this tool and accompanying education points, click on the previous question above (text in gray) to change your answer 'Yes'.",
    type: Type.endpointFail,
  },
  "7": {
    question: "What is the name of the composition?",
    type: Type.text,
    required: true,
    next: "9",
  },
  "8": {
    question:
      "This contract is specifically for Music NFTs and thus isn't applicable to your situation. If you simply want to continue exploring this tool and accompanying education points, click on the previous question above (text in gray) to change your answer to 'Yes'.",
    type: Type.endpointFail,
  },
  "9": {
    question:
      "Did you write the melody and lyrics to the composition by yourself?",
    information: (
      <EducationPoint>
        <h2>Some things to consider:</h2>
        <h3>Covers</h3>
        <p>
          Jimi Hendrix’s famous rendition of “All Along the Watchtower”
          (originally written and recorded by Bob Dylan), is an example of a
          cover. This means the recording artist (Jimi Hendrix) did not own the
          copyright for the musical composition of the song (“All Along the
          Watchtower) he was recording. Additionally, if you were to publicly
          release your own incredible cover version of “All Along the
          Watchtower,” you would need to obtain specific licenses to do so,
          depending on your method of release (i.e. mechanical licenses for
          physical and digital downloads and/or streaming; synchronization
          license for Youtube or video service release). Lucky for you, digital
          mechanical licenses for cover songs are generally easily obtainable
          through most well-known digital distribution services when serving
          tracks to DSPs, making it extremely simple for artists to make cover
          songs available for on-demand streaming.
        </p>
        <h3>Interpolation</h3>
        <p>
          If Ariana Grande’s “7 Rings” sounded familiar, it was because she
          interpolated “My Favorite Things” by Richard Rodgers and Oscar
          Hammerstein, made famous in The Sound of Music. Grande only used part
          of the melody and, lyrics-wise, only used the phrase “my favorite
          things” once. Grande also recorded everything herself, which makes her
          the owner of the sound recording copyright. However, if you are not
          covering a song in its entirety,you need to get permission from the
          owners of the musical composition copyright of the original song you
          are pulling from. Unless otherwise negotiated, you may not own the
          whole musical composition copyright if you took part of an existing
          musical composition and incorporated it into your own song.
        </p>
        <p>
          The ownership over the musical composition copyright for the new work
          is negotiated between the original writers and the new writers
          attempting to create the new work. It is not uncommon for writers of
          very famous, lucrative musical composition copyrights to “play hard
          ball” and maintain 100% of the new work. Many times, a team will take
          the deal and monetize only the sound recording copyright.
        </p>
        <p>
          <a
            href="https://www.copyright.gov/music-modernization/educational-materials/Sampling-Interpolations-Beat-Stores-and-More-An-Introduction-for-Musicians-Using-Preexisting.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Read More
          </a>
        </p>
      </EducationPoint>
    ),
    type: Type.multipleChoice,
    options: [
      {
        text: "Yes",
      },
      {
        text: "No",
      },
    ],
    next: ["10", "11"],
  },
  "10": {
    question: "Did you perform the recording of the composition by yourself?",
    information: (
      <EducationPoint>
        <h2>Some things to consider:</h2>
        <h3>Samples, Remixes, Mashups</h3>
        <p>
          Kanye West’s “Stronger” contains a recording snippet taken from
          “Harder, Better, Faster, Stronger” by Daft Punk. This snippet is
          called a sample. West altered and combined this with his own
          production and lyrics to make his own unique song, but he did not
          create it in its entirety. Similar to an interpolation, unless
          otherwise negotiated, you may not own the whole sound recording
          copyright if you integrated a portion of a sound recording from a song
          you do not own.
        </p>
        <p>
          Further, there is no minimum amount of a sample that you are able to
          use without getting permission. Even 1 second of a sample is not
          allowed.
        </p>

        <h3>Buying Beats</h3>
        <p>
          Lil Nas X originally bought the beat for “Old Town Road” for $30 on
          Beatstars. However, his rights as a buyer were limited. Under the
          contract, the beat’s producer, YoungKio, still retained certain rights
          even after Lil Nas X bought his beat. If you bought a beat from a beat
          store, there may be limitations to your ownership of the sound
          recording.
        </p>
        <p>
          <a
            href="https://www.copyright.gov/music-modernization/educational-materials/Sampling-Interpolations-Beat-Stores-and-More-An-Introduction-for-Musicians-Using-Preexisting.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Read More
          </a>
        </p>
      </EducationPoint>
    ),
    type: Type.multipleChoice,
    options: [
      {
        text: "Yes",
      },
      {
        text: "No",
      },
    ],
    next: ["12", "13"],
  },
  "11": {
    question: "Did you perform the recording of the composition by yourself?",
    information: (
      <EducationPoint>
        <h2>Some things to consider:</h2>
        <h3>Samples, Remixes, Mashups</h3>
        <p>
          Kanye West’s “Stronger” contains a recording snippet taken from
          “Harder, Better, Faster, Stronger” by Daft Punk. This snippet is
          called a sample. West altered and combined this with his own
          production and lyrics to make his own unique song, but he did not
          create it in its entirety. Similar to an interpolation, unless
          otherwise negotiated, you may not own the whole sound recording
          copyright if you integrated a portion of a sound recording from a song
          you do not own.
        </p>
        <p>
          Further, there is no minimum amount of a sample that you are able to
          use without getting permission. Even 1 second of a sample is not
          allowed.
        </p>
        <p>
          <a
            href="https://www.copyright.gov/music-modernization/educational-materials/Sampling-Interpolations-Beat-Stores-and-More-An-Introduction-for-Musicians-Using-Preexisting.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Read More
          </a>
        </p>
        <h3>Buying Beats</h3>
        <p>
          Lil Nas X originally bought the beat for “Old Town Road” for $30 on
          Beatstars. However, his rights as a buyer were limited. Under the
          contract, the beat’s producer, YoungKio, still retained certain rights
          even after Lil Nas X bought his beat. If you bought a beat from a beat
          store, there may be limitations to your ownership of the sound
          recording.
        </p>
      </EducationPoint>
    ),
    type: Type.multipleChoice,
    options: [
      {
        text: "Yes",
      },
      {
        text: "No",
      },
    ],
    next: "13",
  },
  "12": {
    question:
      "Have you already given your rights to the composition or recording to any third parties?",
    information: (
      <EducationPoint>
        <h2>Some things to consider:</h2>
        <h3>Assignment of Rights</h3>
        <p>
          If you’ve signed a recording contract, you may have given your
          exclusive sound recording rights to the label in exchange for the
          record deal. If so, the record deal may prohibit you from using your
          recordings without the label’s permission, even as an NFT. Similarly,
          if you’ve signed a publishing agreement, you may have given your
          exclusive songwriting and musical composition copyrights to the
          publisher for the publishing deal. If so, the publishing agreement may
          prohibit you from using your compositions without the publisher’s
          permission, even as an NFT. Lastly, if you’ve agreed to let someone
          use your song in exchange for payment, it is possible you transferred
          some of your rights.
        </p>
        <p>
          At age 15, Taylor Swift signed a record deal with Big Machine that
          granted the label ownership of the sound recording copyrights for her
          first six albums. Even once Swift left Big Machine, the sound
          recordings were essentially untouchable by Swift and her new label. So
          when Big Machine (and Swift's catalog) fell into the hands of rival
          Scooter Braun, Swift did not have any say in how Braun chose to profit
          from those recordings. Luckily, Swift had still owned all of the
          underlying musical composition copyrights since she wrote the songs.
          Consequently she is able to re-record each album and own the new sound
          recording copyrights. Even if you composed and recorded your song
          entirely on your own, you may not own all the rights to your song if
          you’ve entered into an agreement with a record label or publishing
          agency!
        </p>
        <h3>Buyouts/Works For Hire</h3>
        <p>
          In 2003, hip-hop artist Pusha T wrote the catchy “I’m Lovin’ It” tune
          for McDonalds. The famous jingle went on to be the fast-food chain’s
          longest running marketing campaign in its history. However, Pusha T
          didn’t profit from its longevity, as he transferred all of his musical
          composition copyrights to McDonalds outright when he sold the tune to
          them for a flat fee. If you sold your work to a company or individual
          to use, you may no longer own all of the rights to your song. This is
          often referred to as a work for hire.
        </p>
        <p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.copyright.gov/circs/circ09.pdf"
          >
            Read More
          </a>
        </p>
        <p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.copyright.gov/circs/circ30.pdf"
          >
            Read Even More
          </a>
        </p>
      </EducationPoint>
    ),
    type: Type.multipleChoice,
    options: [
      {
        text: "Yes",
      },
      {
        text: "No",
      },
    ],
    next: ["15", "16"],
  },
  "13": {
    question:
      "Have the third parties who made contributions to the composition or recording given you permission to have their work incorporated into the NFT?",
    information: (
      <EducationPoint>
        <h2>Some things to consider:</h2>
        <h3>3rd Party Ownership</h3>
        <p>
          Producers, mixers, and sound engineers may own a piece of the sound
          recording copyright of your song. Chauncey Mahan, a sound engineer who
          worked with Jay-Z, filed a lawsuit alleging he deserved co-ownership
          of the 45 Jay-Z songs he worked on. The judge threw out the suit
          because Mahan waited too long to file. However, it is possible a less
          obvious contributor has some ownership rights to your song; especially
          with recent laws aimed at improving access to copyrights for all
          participants involved in the creative process.
        </p>
        <p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.copyright.gov/music-modernization/amp/"
          >
            Read More
          </a>
        </p>
        <p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.soundexchange.com/about/general-faqs/letter-direction-faqs/"
          >
            Read Even More
          </a>
        </p>
      </EducationPoint>
    ),
    type: Type.multipleChoice,
    options: [
      {
        text: "Yes",
      },
      {
        text: "No",
      },
    ],
    next: ["12", "14"],
  },
  "14": {
    question:
      "You might not have all of the rights you need to sell this NFT, and we recommend consulting with a lawyer. While this contract is no longer valid for your situation, if you simply want to continue exploring this tool and accompanying education points, change your answers to the previous questions by clicking on them above (text in gray).",
    type: Type.endpointFail,
  },
  "15": {
    question:
      "You may have already given away some of the rights you need to sell this NFT, and we recommend consulting with a lawyer. While this contract is no longer valid for your situation, if you simply want to continue exploring this tool and accompanying education points, change your answers to the previous questions by clicking on them above (text in gray).",
    type: Type.endpointFail,
  },
  "16": {
    question:
      "Are you giving the buyer of the NFT any exclusive copyrights to the composition, recording, or artwork? Or is it just for personal, non-commercial use and display?",
    information: (
      <EducationPoint>
        <h2>Some things to consider:</h2>
        <h3>Copyright</h3>
        <p>
          You can think of a copyright as containing a bundle of different
          rights. These rights are things that the owner of the copyright can do
          with their property. The whole point of section 2 is to establish what
          rights the buyer has. In this contract, they are only buying
          non-commercial use and resale rights. Everything else stays with the
          artist. The following are all the rights that make up the copyright
          bundle.
        </p>
        <h4>Limited personal non-commercial use</h4>
        <p>
          This means that the Buyer cannot profit from the NFT other than by
          reselling it on a secondary market.
        </p>
        <h4>Resale Rights</h4>
        <p>
          Resale rights allow the owner of the copyright, “to benefit from the
          increased value of their works over time by granting them a percentage
          of the proceeds from the resale of their original works.”{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.copyright.gov/docs/resaleroyalty"
          >
            (Learn more)
          </a>
          .
        </p>
        <h4>License Right</h4>
        <p>
          No right to License means that the Buyer can’t give someone else the
          rights they bought with this contract.
        </p>
        <h4>Commercial Exploitation Right</h4>
        <p>
          Exploit in this context means to make use of. Excluding this right
          means that the buyer can’t use the NFT in a way that generates profit
          (other than reselling the NFT on a secondary market) .
        </p>
        <h4>Reproduction Right</h4>
        <p>
          The right to reproduction is the right to make copies of the
          copyrighted work. You can think of photocopies of a book.
        </p>
        <h4>Distribution Right</h4>
        <p>
          A distribution right refers to a copyright holder's exclusive right to
          sell, lease, or transfer copies of the protected work to the public.
        </p>
        <h4>Public Performance Right</h4>
        <p>
          In the context of a song, this means the ability to play the song on
          the radio or in a bar.
        </p>
        <h4>Public Display Right</h4>
        <p>
          Think of hanging a work of art in a museum. That would be a public
          display.
        </p>
        <h4>Right to Make Derivative Works</h4>
        <p>
          A "derivative work" is a work that is "based upon one or more
          preexisting works." One of the exclusive rights of a copyright owner
          is to make derivative works. The United States Copyright Act gives
          many examples of what is a derivative work. One example is a motion
          picture based upon a book, another would be a remix.
        </p>
      </EducationPoint>
    ),
    type: Type.multipleChoice,
    options: [
      {
        text: "Yes, I am trying to assign copyrights or other licenses",
      },
      {
        text: "No, this NFT should only grant personal, non-commercial use and display rights",
      },
    ],
    next: ["17", "18"],
  },
  "17": {
    question:
      "This contract builder doesn't support this use case, and we recommend consulting with a lawyer. While this contract is no longer valid for your situation, if you simply want to continue exploring this tool and accompanying education points, change your answers to the previous questions by clicking on them above (text in gray).",
    type: Type.endpointFail,
  },
  "18": {
    question:
      "Does your NFT promise off chain benefits?",
    information: (
      <div>
        <EducationPoint>
          <h2>Some things to consider:</h2>
          <h3>Merch & Access Off-chain Benefits</h3>
          <h4>Limitations</h4>
          <p>
            Given the growing diversity of in-real-life (IRL) forms of utility associated 
            with the sale of an NFT, it is near impossible to ensure that our NFT contract 
            template builder captures every possible IRL utility case perfectly. There 
            will always be edge cases that require unambiguous, detailed contractual 
            language, and many IRL offerings will include unique elements best addressed 
            with a customized approach. For this reason, <b>we would like to reiterate that 
            this tool is not legal advice, and we remind all users to consult with a 
            lawyer on their projects.</b>
          </p>
          <p>
            Nonetheless, to provide a basic contractual language template around IRL 
            benefits for NFTs, we’ve separated potential IRL utilities into two distinct 
            categories: MERCH and ACCESS. Distinguishing these groups allows us to 
            provide broad language covering the utility deployed  across music NFT 
            marketplaces to date, which may then be tailored further by individual 
            projects to meet the specific utilities included with their NFT project.
          </p>
        </EducationPoint>
        <EducationPoint>
          <h4>Buyer and Artist Responsibilities with off-chain benefits</h4>
          <p>
            While solutions for managing the redemption and tracking of off-chain benefits 
            are still developing, several Web3-based approaches have been proposed 
            including “burning” and “counting”:
          </p>
          <ul>
            <li>
              Burning (i.e. destroying) an NFT once an off-chain benefit is claimed by a 
              buyer, and replacing their original token with one that features slightly 
              different artwork, representing the “used-up benefit”.
            </li>
            <li>
              Counting, which involves tracking the quantity of benefits remaining in the 
              smart contract. This method keeps track of each benefit and each NFT in an 
              on-chain counter which decrements on redemption.
            </li>
            <li>
              Read below for additional methods
            </li>
          </ul>
          <button type="button" className="ReadMore" onClick={readMore}>Read More</button>
          <div className='ExtendedContent'> 
            <p>
              Numerous Web3 solutions can demonstrate when a real-world benefit attached 
              to an NFT has been redeemed. While this project still firmly believes that 
              this responsibility should lie with the artist, other potential solutions 
              exist. Two standard options are burning and counting. Burning an NFT 
              requires the artist to create separate tokens for each benefit. The token 
              is destroyed or “burned when that benefit is claimed.” For example, when 
              someone claims tickets using their Kings of Leon NFT, that NFT is destroyed, 
              and a new one with slightly different artwork is airdropped to the buyer. 
              This allows subsequent purchasers to see that the NFT has been used.
            </p>
            <p>
              Counting involves tracking the quantity remaining in the smart contract. 
              This method keeps track of each benefit and each NFT in an on-chain counter 
              which decrements on redemption.
            </p>
            <p>
              Some other ways of solving this problem are:
            </p>
            <ol>
              <li>
                In the case of merch, each NFT can have an edition number. If there are 
                only 100 posters available, you can see how many NFTs have been purchased. 
                You can also see who the seller is so you know if you’re buying from the 
                artist or a reseller. You can also burn the NFT to collect the poster.
              </li>
              <li>
                When you buy an NFT, you connect to a form that checks the edition number 
                against a database to see if the NFT has been redeemed or not. If not, 
                then you can enter shipping information. This is off-chain and presents 
                other technical challenges.
              </li>
              <li>
                Proof of Attendance Protocol or "POAP" is another solution. With this 
                method, you can claim an airdrop by providing your wallet ID which is 
                then verified at the door. However, those interviewed on the topic noted 
                fans generally don’t understand this yet, so email works better.
              </li>
            </ol>
          </div>
        </EducationPoint>
      </div>
    ),
    type: Type.multipleChoice,
    options: [
      {
        text: "Yes, this NFT grants certain off-chain benefits",
      },
      {
        text: "No, this NFT does not offer any off-chain benefits",
      },
    ],
    next: ["19", "33"],
  },
  "19": {
    question:
      "Do your off chain benefits include tickets for in real life concerts?",
    type: Type.multipleChoice,
    options: [
      {
        text: "Yes, this NFT grants tickets to live shows, or live performance perks",
      },
      {
        text: "No, this NFT does not offer any tickets or perks to irl shows",
      },
    ],
    next: ["20", "21"],
  },
  "20": {
    question:
      "This contract builder doesn't support this use case, and we recommend consulting with a lawyer. While this contract is no longer valid for your situation, if you simply want to continue exploring this tool and accompanying education points, change your answers to the previous questions by clicking on them above (text in gray).",
    information: (
      <EducationPoint>
        <h2>Tickets - Why we didn’t support certain off chain benefits</h2>
        <p>
          We omitted the packaging of IRL event tickets with NFTs from this 
          version of the contract builder owing to the numerous technical and 
          logistical challenges that still exist around their implementation. 
          These challenges include:
        </p>
        <ul>
          <li>
            Developing administratively and technically simple means to enable 
            ticket redemption at events.
          </li>
          <li>
            Developing means to incorporate an NFT-based ticketing flow into 
            traditional physical (and digital) ticketing models.
          </li>
          <li>
            The wide variety of possible NFT ticketing implementations including 
            single tickets, multiple tickets, and lifetime ‘golden’ tickets, 
            among others, each with their own challenges around redemption and 
            tracking.
          </li>
        </ul>
        <p>
          We will continue to track the evolution and implementation of these 
          benefits and monitor as standards and best practices solidify and will 
          look to include them in future versions of the contract builder.
        </p>

        <button type="button" className="ReadMore" onClick={readMore}>Read More</button>
        <div className='ExtendedContent'> 
          <p>
            When deciding which types of off-chain benefits to add to this version 
            of the contract builder template, we explored adding language that 
            covers the inclusion of live, IRL event tickets as a benefit packaged 
            with the sale of NFTs. This use-case for NFTs is becoming more common 
            as individual artists {" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.rollingstone.com/culture-council/articles/nfts-game-changer-industry-1151676/"
            >
            experiment
            </a> with bundling tickets and live
            performance perks with NFTs, and major entertainment companies like{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://business.ticketmaster.com/business-solutions/nfl-partners-with-ticketmaster-to-offer-limited-edition-nfts-to-celebrate-super-bowl-lvi/"
            >
              Ticketmaster
            </a> begin to test the market for NFT ticketing solutions.
          </p>
          <p>
            As we continued to explore this form of off-chain benefits, we realized 
            that the ecosystem around live ticketing via NFTs is still nascent and 
            evolving and comes with plenty of logistical and technical challenges. 
            There remain questions about the best technical practices for enabling 
            the redemption of this type of benefit. Does the NFT act as a ticket 
            that guarantees event entry? Or should the actual pass that ensures 
            event access come in some other form, such as an additional NFT 
            airdropped to holders of the original NFTs? Another option, which is 
            currently being tested by the Web3 social club {" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://poolsuite.net/"
            >
              Poolsuite
            </a>, is the use of
            token-gated QR codes, accessible by connecting your crypto wallet to 
            their website. Once the form of ticket is decided, more issues arise. 
            For instance, how are options for providing tickets to NFT holders 
            validated on-site, where entry is presumably linked to the barcodes 
            associated with traditional physical and digital tickets?
          </p>
          <p>
            There are also many logistical hurdles around incorporating an NFT-based 
            ticketing flow into the traditional physical (and digital) ticketing 
            model. For example, how are tickets associated with NFT purchases 
            incorporated into tracking overall ticket sales and live event accounting? 
            Suppose an individual artist provides live event tickets as a benefit with 
            their NFTs. In that case, they will likely have to work closely with event 
            promoters and third-party ticketing providers to coordinate fulfillment 
            and cover the costs for essentially “comped” tickets. Assigning NFT 
            holders guest list spots has been a common work-around for artists, but 
            this has its problems. Coordination moves to falling solely on the artist 
            team (as opposed to 3rd party ticketing platform), which means gathering 
            the names of potentially pseudonymous NFT purchasers and figuring out how 
            to scale up to many NFT holders. There are only so many guest list spots 
            to go around. Suppose there are more NFT holders than guest list spots 
            available. In that case, an artist will run into the same problem of 
            dealing directly with event promoters to purchase additional seats and 
            incur transactional costs around these activities. Similarly, this manual 
            redemption process creates timing issues when adding NFT holders to an 
            event guest list. Is there a limited time frame for claiming one’s tickets, 
            or will artists and their teams need to monitor their email up to showtime 
            to ensure fulfillment?
          </p>
          <p>
            An additional complication is the wide variety of possible NFT ticketing 
            implementations. NFTs can be bundled to include single event tickets. 
            Still, we’ve also seen artists {" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.rollingstone.com/pro/news/kings-of-leon-when-you-see-yourself-album-nft-crypto-1135192/"
            >
              offering a “golden ticket.”
            </a> The benefit
            provides lifetime access to that artist’s live performances or multiple 
            events. The logistics around honoring recurring live benefits associated 
            with an NFT get even more complicated. Artists need to continuously track 
            ownership of the NFT, as it may be sold and resold, and determine how best 
            to enable redemption while limiting the ability to abuse the system.
          </p>
          <p>
            Ultimately, we decided to omit the NFT x IRL ticketing use case from this 
            version of the contract builder template, owing to many technical and 
            logistical challenges currently associated with these types of products. 
            We will continue to track the evolution and implementation of these 
            benefits and monitor as standards and best practices solidify and will 
            look to include them in future versions of the contract builder.
          </p>
        </div>
      </EducationPoint>
    ),
    type: Type.endpointFail,
  },
  "21": {
    question:
      "Do your off chain benefits include redeemable merchandise?",
    information: (
      <EducationPoint>
        <h2>Some things to consider:</h2>
        <h3>How we define 'Merch'</h3>
        <p>
          We define MERCH utilities as physical or digital collectibles. 
          Examples include physical posters, apparel, or other NFTs 
          (i.e., digital MERCH).
        </p>
      </EducationPoint>
    ),
    type: Type.multipleChoice,
    options: [
      {
        text: "Yes",
      },
      {
        text: "No",
      },
    ],
    next: ["22", "27"],
  },
  "22": {
    question: "Describe your Merchandise item(s):",
    // required: true,
    type: Type.bigText,
    next: "23",
  },
  "23": {
    question: "Provide claiming instructions:",
    information: (
      <EducationPoint>
        <h2>Example claiming instructions</h2>
        <p>
          “In order to claim the NFT MERCH, please send 
          your name, email address, phone number, and crypto 
          wallet # to ______. Once received, you will receive a 
          notification from ___ confirming that you have been 
          identified as the holder of the NFT along with more 
          specific instructions for how to claim/redeem your NFT 
          MERCH."
        </p>
      </EducationPoint>
    ),
    // required: true,
    type: Type.bigText,
    next: "24",
  },
  "24": {
    question: "What is your contact information with regards to merchandise?",
    information: (
      <EducationPoint>
        <h2>Some things to consider</h2>
        <h3>Correspondence for Artist and Buyer</h3>
        <p>
          NFTs with real-world benefits attached require some sort of 
          customer service to fulfill them. An artist offering merch or 
          access needs to be aware that someone has to serve this role, 
          in order to ensure that the purchaser is able to claim what 
          they’ve paid for. This customer service consists of two parts: 
          1) Some way for the purchaser to contact the artist or their 
          team, typically via an email address, and 2) A method for the 
          artist to track whether benefits have been redeemed so they can 
          inform purchasers of this information.
        </p>
        <button type="button" className="ReadMore" onClick={readMore}>Read More</button>
        <div className='ExtendedContent'> 
          <p>
            When considering customer support, there are decades of 
            music-industry practice and standards around artists selling 
            “merch” and “access.” These standard support channels should 
            remain open and transfer over to Web3. In all likelihood, 
            buyers will go to an established website where merchandise is 
            already available and where there will be a point of contact 
            for troubleshooting. We will not get into the basics of 
            fulfillment here. We will, however, cover what is different 
            when integrating an NFT into the fulfillment process. We 
            believe the artist should provide an email address at minimum 
            as a designated channel for NFT-related customer support, 
            especially in the case where a buyer of an NFT has trouble 
            accessing an experience that they bought access to through 
            the token. For instance, Coachella provided a contact email 
            to everyone who purchased tickets via NFTs for post-purchase 
            inquiries. This solution may be considered low-tech, but it is 
            easy for consumers to use and understand in an already novel 
            process.
          </p>
          <p>
            Given the potential for secondary NFT sales, artists assume 
            the new responsibility of tracking fulfillment. For example, 
            if an NFT allows the buyer to claim one hoodie and two 
            shirts, the hoodie may have been claimed, while the shirts 
            have not. The artist needs to make this information available 
            for buyers on the secondary market. Otherwise, an NFT may 
            sell again under the pretense of merchandise or access 
            claimable when it is not. This example further supports 
            providing a designated email for NFT-related inquiries. The 
            artist is also responsible for alerting fans when merch or 
            access is "sold out" or if the offer expires.
          </p>
        </div>
      </EducationPoint>
    ),
    // required: true,
    type: Type.text,
    next: "25",
  },
  "25": {
    question:
      "Does this Merch benefit expire?",
    information: (
      <EducationPoint>
        <h2>Some things to consider:</h2>
        <p>
          An expiration date makes sense for certain real-world benefits. 
          An expiration date avoids the potential problem of a buyer 
          popping up years after an NFT is sold and trying to claim a 
          real-world benefit. The responsibility is on the artist’s team 
          to figure out the best way to approach this issue. When Verite 
          released an NFT that included a physical cassette tape, her 
          team set a final claim date. She informed fans that the cassette 
          was attached only to the original sale. Then, she announced that 
          her team would take a snapshot of the smart contract at a 
          specified date and time. If you wanted to claim the tape, you 
          had until the date and time of the snapshot to acquire the NFT, 
          after which secondary sales were no longer valid.
        </p>
      </EducationPoint>
    ),
    type: Type.multipleChoice,
    options: [
      {
        text: "Yes",
      },
      {
        text: "No",
      },
    ],
    next: ["26", "27"],
  },
  "26": {
    question: "Enter the expiration date (YYYY-MM-DD):",
    // required: true,
    type: Type.text,
    next: "27",
  },
  "27": {
    question:
      "Do your off chain benefits include Access?",
    information: (
      <EducationPoint>
        <h2>Some things to consider:</h2>
        <h3>How we define 'Access'</h3>
        <p>
          We define ACCESS utilities as those that provide IRL 
          experiences upon redemption and require the physical or 
          digital presence of the redeemer. Examples of ACCESS 
          utilities include IRL artist meet-and-greets, access to 
          Discord servers, or exclusive Zoom sessions with artists. 
          For now, this category does not include concert tickets or 
          other traditional “ticketing” applications that require 
          coordination with another third party, like a venue or tour 
          promoter.
        </p>
      </EducationPoint>
    ),
    type: Type.multipleChoice,
    options: [
      {
        text: "Yes",
      },
      {
        text: "No",
      },
    ],
    next: ["28", "33"],
  },
  "28": {
    question: "Describe your Access benefit:",
    // required: true,
    type: Type.bigText,
    next: "29",
  },
  "29": {
    question: "Provide claiming instructions:",
    information: (
      <EducationPoint>
        <h2>Example claiming instructions</h2>
        <p>
          “In order to claim the NFT ACCESS, please send
          your name, email address, phone number, and crypto
          wallet # to ______. Once received, you will receive a
          notification from ___ confirming that you have been
          identified as the holder of the NFT along with more
          specific instructions for how to claim/redeem your NFT
          ACCESS."
        </p>
      </EducationPoint>
    ),
    // required: true,
    type: Type.bigText,
    next: "30",
  },
  "30": {
    question: "What is your contact information with regards to access?",
    information: (
      <EducationPoint>
        <h2>Some things to consider</h2>
        <h3>Correspondence for Artist and Buyer</h3>
        <p>
          NFTs with real-world benefits attached require some sort of
          customer service to fulfill them. An artist offering merch or
          access needs to be aware that someone has to serve this role,
          in order to ensure that the purchaser is able to claim what
          they’ve paid for. This customer service consists of two parts:
          1) Some way for the purchaser to contact the artist or their
          team, typically via an email address, and 2) A method for the
          artist to track whether benefits have been redeemed so they can
          inform purchasers of this information.
        </p>
        <button type="button" className="ReadMore" onClick={readMore}>Read More</button>
        <div className='ExtendedContent'>
          <p>
            When considering customer support, there are decades of
            music-industry practice and standards around artists selling
            “merch” and “access.” These standard support channels should
            remain open and transfer over to Web3. In all likelihood,
            buyers will go to an established website where merchandise is
            already available and where there will be a point of contact
            for troubleshooting. We will not get into the basics of
            fulfillment here. We will, however, cover what is different
            when integrating an NFT into the fulfillment process. We
            believe the artist should provide an email address at minimum
            as a designated channel for NFT-related customer support,
            especially in the case where a buyer of an NFT has trouble
            accessing an experience that they bought access to through
            the token. For instance, Coachella provided a contact email
            to everyone who purchased tickets via NFTs for post-purchase
            inquiries. This solution may be considered low-tech, but it is
            easy for consumers to use and understand in an already novel
            process.
          </p>
          <p>
            Given the potential for secondary NFT sales, artists assume
            the new responsibility of tracking fulfillment. For example,
            if an NFT allows the buyer to claim one hoodie and two
            shirts, the hoodie may have been claimed, while the shirts
            have not. The artist needs to make this information available
            for buyers on the secondary market. Otherwise, an NFT may
            sell again under the pretense of merchandise or access
            claimable when it is not. This example further supports
            providing a designated email for NFT-related inquiries. The
            artist is also responsible for alerting fans when merch or
            access is "sold out" or if the offer expires.
          </p>
        </div>
      </EducationPoint>
    ),
    // required: true,
    type: Type.text,
    next: "31",
  },
  "31": {
    question:
      "Does this Access benefit expire?",
    information: (
      <EducationPoint>
        <h2>Some things to consider:</h2>
        <p>
          An expiration date makes sense for certain real-world benefits.
          An expiration date avoids the potential problem of a buyer
          popping up years after an NFT is sold and trying to claim a
          real-world benefit. The responsibility is on the artist’s team
          to figure out the best way to approach this issue. When Verite
          released an NFT that included a physical cassette tape, her
          team set a final claim date. She informed fans that the cassette
          was attached only to the original sale. Then, she announced that
          her team would take a snapshot of the smart contract at a
          specified date and time. If you wanted to claim the tape, you
          had until the date and time of the snapshot to acquire the NFT,
          after which secondary sales were no longer valid.
        </p>
      </EducationPoint>
    ),
    type: Type.multipleChoice,
    options: [
      {
        text: "Yes",
      },
      {
        text: "No",
      },
    ],
    next: ["32", "33"],
  },
  "32": {
    question: "Enter the expiration date (YYYY-MM-DD):",
    // required: true,
    type: Type.text,
    next: "33",
  },
  "33": {
    question:
      "If the buyer of this NFT later sells it on a secondary market, what percentage of the resale profit (if any) should be directed back to you?",
    information: (
      <EducationPoint>
        <h2>Some things to consider:</h2>
        <h3>Sales on Secondary Markets</h3>
        <p>
          One of the unique features of NFTs and the smart contracts underlying
          them is the ability to direct a share of any secondary sales back to
          the original artist (and/or their collaborators). For instance, a
          musician who sells an NFT featuring one of their songs, could code the
          original NFT smart contract to send them a 15% (or whatever they
          decide) share of the sale price every time that NFT is sold to new
          purchasers in the future. While this functionality has been lauded as
          game-changing for artists and musicians, it is important to note that
          there are still some challenges to this system working in practice.
          The smart contracts produced by some NFT minting platforms do not
          allow for interoperability of secondary sales percentages across
          platforms. So if you mint an NFT on Platform A which does not have
          platform interoperability as part of it’s smart contract, then a
          secondary sale of the NFT on Platform B will not direct any sales
          revenue back to the original artist. This problem will eventually be
          solved as NFT platforms are already working together to develop
          standards that will allow for interoperability. However, in the short
          term, it is essential that artists do the background research on how
          secondary sales are treated by any NFT platform with which they plan
          to work.
        </p>
      </EducationPoint>
    ),
    type: Type.text,
    required: true,
    next: "34",
  },
  "34": {
    question: "What US state do you reside in?",
    type: Type.text,
    required: true,
    next: "35",
  },
  "35": {
    question: "What is the email address of the artist?",
    type: Type.text,
    required: true,
    next: "36",
  },
  "36": {
    question:
      "You're done! Be sure to scroll through the generated contract on this site before printing to see additional education points (in yellow) explaining their corresponding clauses.",
    information: (
      <div>
        <p>
          <strong>How should artists use this contract?</strong> From a
          practical standpoint, it is unlikely that any given buyer would be
          specifically identified prior to the NFT sale, so we envision this
          contract serving as a set of standard “terms and conditions” that any
          potential NFT buyer must agree to before purchasing the Artist’s NFT.
          These terms would most likely appear as a “click through” on the
          Artist’s homepage or fan club page where the NFT is being minted.
          Alternatively, if the NFT is being minted on a platform that already
          exists, these terms could be incorporated into the description of the
          NFT wherever it is listed. Eventually we hope to be able to attach the
          contract “on chain” to the NFT itself, in a way that can auto-populate
          with the buyer's info, including but not limited to their wallet
          address.
        </p>
        <p>
          <span
            style={{
              textDecoration: "underline",
              color: "#3498db",
              cursor: "pointer",
            }}
            onClick={() => window.print()}
          >
            <b>Click here</b>
          </span>{" "}
          to directly print or obtain a PDF version of the contract. Be sure to
          uncheck “headers and footers” in the “more settings” section of the
          print dialogue.
        </p>
      </div>
    ),
    type: Type.endpointSuccess,
  },
};

export default tree;
export { Type };
