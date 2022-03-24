import { ReactElement } from "react";
import styled from "styled-components";

enum Type {
  multipleChoice,
  text,
  endpointFail,
  endpointSuccess,
}

const EducationPoint = styled.div`
  a {
    color: #3498db;
  }
`;

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
    next: "19",
  },
  "19": {
    question: "What US state do you reside in?",
    type: Type.text,
    required: true,
    next: "20",
  },
  "20": {
    question: "What is the email address of the artist?",
    type: Type.text,
    required: true,
    next: "21",
  },
  "21": {
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
