import { useGlobal } from "reactn";
import styled from "styled-components";
import Tooltip from "./Tooltip";
import tree, { Type } from "./Tree";

type Response = { question: string; answer: string };

const ContractComponent = styled.div`
  white-space: pre-wrap;
  border-radius: 10px;
  font-family: sans-serif;
  flex: 1;
  box-sizing: border-box;
  @media print {
    box-shadow: none;
    margin-top: 0;
  }
`;

const InnerElement = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  padding-left: 100px;
  margin-left: -100px;
  position: relative;
  @media screen and (max-width: 800px) {
    max-height: calc(100vh - 120px);
  }
  @media print {
    max-height: max-content;
  }
  ::-webkit-scrollbar {
    width: 6px;
    height: 18px;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    height: 12px;
    border: 8px solid transparent;
    border-width: 0 0 0 8px;
    background-clip: padding-box;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Placeholder = styled.div`
  border-radius: 4px;
  padding: 0 50px;
  height: 16px;
  margin: 0 3px -2px 3px;
  display: inline-block;
  background: rgba(0, 0, 0, 0.1);
`;

const Highlight = styled.div`
  border-radius: 4px;
  padding: 2px 6px;
  min-height: 16px;
  margin: -2px 0 0 0;
  display: inline-block;
  background: rgba(0, 0, 0, 0.1);
  @media print {
    padding: 0;
    margin: 0;
    background: transparent;
    display: inline;
  }
`;

const SectionTitle = styled.h3`
  margin: 20px 0;
  font-weight: bold;
`;

const Section = styled.span`
  font-weight: bold;
`;

const Subparagraph = styled.p`
  margin-left: 20px;
`;

const InlineEducationPoint = styled.div`
  background: #ffef9c;
  padding: 0.1px 15px;
  border-radius: 4px;
  @media print {
    display: none;
  }
`;

const UnfilledTooltip = () => (
  <Tooltip bottom="30" customTooltip={() => <Placeholder />}>
    This part of your contract will be filled in response to a question you
    haven't yet answered.
  </Tooltip>
);

const SEmbed = ({ r, id }: { r: Response[]; id: string }) => {
  const resp = r.filter((i) => i.question === id);
  if (resp.length === 0) return <UnfilledTooltip />;
  else
    return (
      <Tooltip
        bottom="30"
        customTooltip={() => <Highlight>{resp[0].answer}</Highlight>}
      >
        This part of your contract was filled in response to the question "
        {tree[id].question}"
      </Tooltip>
    );
};

const Answer = ({ r, id, desire }: { r: Response[]; id: string; desire: string}) => {
  const resp = r.filter((i) => i.question === id);
  return resp[0]?.answer === desire
};

function Contract() {
  const [r = []] = useGlobal("responses");
  //  && Answer({ r, id: '0', desire: '1' })
  const [cqid] = useGlobal("currentQuestion");

  if (!cqid)
    return (
      <ContractComponent>
        <p>
          <em>
            Your contract isn't finished yet! More terms will appear here as you
            complete the questions.
          </em>
        </p>
      </ContractComponent>
    );
  return (
    <ContractComponent>
      <InnerElement>
        {tree[cqid].type === Type.endpointFail && (
          <p>
            <em>
              You've reached a failure state in the questions, so we're not able
              to generate a contract for you. You can click the title of a
              previous question above to go back.
            </em>
          </p>
        )}
        {cqid !== "36" && tree[cqid].type !== Type.endpointFail && (
          <p>
            <em>
              Your contract isn't finished yet! More terms will appear here as
              you complete the questions.
            </em>
          </p>
        )}
        {Number(cqid) > 1 && (
          <div>
            <SectionTitle>1.0 - PARTIES</SectionTitle>
            <p>
              This agreement ("Agreement") is a legally binding agreement
              between <SEmbed r={r} id="1" /> ("Artist") and the individual or
              entity seeking to acquire the NFT defined below ("Buyer" or "you")
              setting forth the terms of sale and use for Buyer's acquisition of
              the NFT defined below. By minting or purchasing the NFT defined
              below, both Artist and Buyer acknowledge and agree to the terms
              and conditions set forth in this Agreement and agree to be bound
              by same.
            </p>
          </div>
        )}
        {Number(cqid) > 3 && (
          <SectionTitle>2.0 - CONVEYANCE OF RIGHTS</SectionTitle>
        )}
        {Number(cqid) > 3 && (
          <p>
            <Section>2.1</Section> For the purpose of this Agreement, the "
            <SEmbed r={r} id="2" />" ("NFT") means the non-fungible token
            created by Artist and first auctioned for sale on{" "}
            <SEmbed r={r} id="3" /> ("Platform"). For clarity and the avoidance
            of doubt, in the event of a conflict between the terms of this
            Agreement and the terms and conditions of the Platform, the terms
            and conditions of the Platform shall control to the extent
            applicable.{" "}
            {Number(cqid) > 7 && (
              <span>
                The NFT embodies or represents a song consisting of a musical
                composition (i.e. notes and lyrics) entitled{" "}
                <SEmbed r={r} id="7" /> (the "Composition")
              </span>
            )}
            {Number(cqid) > 15 && (
              <span>
                {" "}
                which Composition is embodied in a master recording (i.e. a
                recorded performance of the Composition) (the "Master") as
                combined with certain artwork owned and/or controlled by Artist
                (the "Artwork"). As used herein, the Master, Composition, and
                Artwork embodied in the NFT (i.e. as opposed to the NFT itself)
                are sometimes collectively referred to herein as the "Work".
                Additionally, the NFT may, but is not guaranteed to, include or
                entitle its current owner to benefits such as off-chain assets,
                exclusive access to certain events or websites, or "air-drop"
                benefits, as determined from time to time by Artist in Artist's
                sole and absolute discretion ("Added NFT Benefits"). The NFT may
                be acquired by you through primary sale on the Platform, or by
                subsequent sale or transfer from a legitimate source.
              </span>
            )}
          </p>
        )}
        {Number(cqid) > 17 && (
          <div>
            <p>
              <Section>2.2</Section> Subject to and conditional upon your
              compliance with these Terms, Artist grants to you the following
              limited rights with respect to the NFT (together the "NFT
              Rights"):
            </p>
            <p>
              <Section>2.3</Section> Artist hereby grants to Buyer a
              non-exclusive, a worldwide license to access and/or display the
              NFT, solely for your personal, non-commercial purposes. For
              clarity, when Buyer acquires the NFT, Buyer owns all personal
              property rights to the NFT (<em>e.g.</em>, the right to freely
              sell or transfer the NFT), however such rights do NOT include the
              ownership of, or any other rights to use or exploit, the Work, the
              intellectual property rights contained in the Work, or Artist's
              name or likeness. For clarity, The NFT is separate and distinct
              from the Work, and Buyer's purchase of the NFT shall not grant
              Buyer any specific rights to the Work itself (including, without
              limitation, copyrights, or exploitation rights) as more fully set
              forth in section 2 below.
            </p>
            <p>
              <Section>2.4</Section> Please read carefully before proceeding.
              This is a binding legal contract and affects your rights.
            </p>
            <Subparagraph>
              <Section>2.4.1</Section> YOU UNDERSTAND AND AGREE THAT BY
              ACQUIRING THE NFT, YOU ARE AGREEING TO BE LEGALLY BOUND BY ALL OF
              THESE TERMS AND CONDITIONS, WHICH INCLUDE LIMITATIONS ON USE,
              DISCLAIMERS OF WARRANTY, AND LIMITATIONS OF LIABILITY.
            </Subparagraph>
            <Subparagraph>
              <Section>2.4.2</Section> Artist grants the NFT to Buyer on an "as
              is" basis without any other specific promises of any kind. For
              clarity, and without limitation, Artist does not represent or
              warrant that the Work does not infringe any proprietary rights or
              copyrights, that third parties have not created or downloaded
              their own copies of the Work, or that third parties will not
              attempt to sell their own NFTs featuring such Work. Artist has no
              obligation to take down any other NFTs featuring such Work.
            </Subparagraph>
            <Subparagraph>
              <Section>2.4.3</Section> Except for the license granted in this
              section, Artist retains all right, title, and interest in and to
              the Work (i.e. all rights in and to the Work not expressly
              provided for in this Agreement are hereby reserved by Artist.)
              Buyer acknowledges and agrees that (a) this Agreement does not
              convey any rights in the Master, Composition, or Artwork, or any
              other rights, interests, revenues or royalties earned from their
              commercial exploitation (specifically including, but not limited
              to, publishing royalties, licensing fees, or streaming revenues),
              and (b) this Agreement does not convey to Buyer any right to use
              the name, image or likeness of Artist; provided that Buyer may use
              Artist's name as necessary to accurately describe the NFT.
            </Subparagraph>
            <Subparagraph>
              <Section>2.4.4</Section> Only limited personal non-commercial use
              and resale rights in the NFT are granted, and you have no right to
              license, commercially exploit, reproduce, distribute, prepare
              derivative works, publicly perform, or publicly display the NFT or
              the Work contained therein. All copyright and other rights
              contained in the NFT or Work are reserved and not granted.
            </Subparagraph>
            <Subparagraph>
              <Section>2.4.5</Section> For clarity, a "non-commercial license"
              means that Buyer may sell the NFT on a secondary market, but shall
              not have the right to engage in any of the other following
              commercial activities: (i) make money by charging tickets or
              licensing fees to third parties for the right to view, listen to,
              or use the NFT; (ii) publicly perform or broadcast the NFT at an
              event for profit or a place of business; (iii) incorporate the NFT
              into any other product or service that generates a profit; (iv)
              use the NFT to promote any other person, product, or business. For
              further avoidance of doubt, Buyer may only profit from the NFT by
              reselling the NFT in its entirety on a secondary market.
            </Subparagraph>
            <Subparagraph>
              <Section>2.4.6</Section> For clarity, not modifying the NFT or
              preparing "derivative works" means that the Buyer shall not have
              the right to engage in any of the following activities: (i) use
              the Work (i.e. Master, Composition, and Artwork) from the NFT in
              any manner separate and apart from the NFT as a whole; (ii)
              distort, recolor, reformat, or otherwise change the "look and
              feel" of the NFT or (iii) create "remixes", "alternate versions",
              "prequels/sequels" or other ancillary content that references the
              NFT (including any specific themes or characters contained
              therein).
            </Subparagraph>
            <Subparagraph>
              <Section>2.4.7</Section> To the extent applicable and provided for
              under existing law, Artist will be entitled to all public
              performance income generated in connection with the public
              performances and/or digital transmissions of the Work, if any.
            </Subparagraph>
            <InlineEducationPoint>
              <p>
                When a song is played in a bar or other public place, there are
                companies called performance rights organizations that keep
                track of what’s played and pay out money to those artists. This
                is the function of ASCAP, BMI and SESAC in the United States.
                This is an important revenue stream for artists. Unfortunately,
                there is no standardized mechanism yet to keep track of songs
                performed on NFT platforms. Consequently there is no standard
                for tracking performance royalties for Works that are
                encapsulated in NFTs. But there probably should be.
              </p>
              <p>
                If these acronyms are unfamiliar to you, you can find some{" "}
                <a href="https://www.copyright.gov/policy/unclaimed-royalties/glossary.pdf">
                  helpful definitions
                </a>
                .
              </p>
            </InlineEducationPoint>
          </div>
        )}
        {Number(cqid) > 15 && (
          <div>
            <SectionTitle>3.0 - REPRESENTATIONS AND WARRANTIES</SectionTitle>
            <p>
              <Section>3.1</Section> Artist hereby represents and warrants that
              they are the sole and exclusive owner or authorized licensee of
              all right, title and interest (including, without limitation, the
              copyright) in the Work embodied in the NFT and that the Buyer's
              use of the NFT in accordance with this Agreement will not violate
              the rights of any third party or entity.
            </p>
            <InlineEducationPoint>
              <p>
                Most contracts have a representations and warranties section
                that lays out certain rights of everyone signing the contract.
                This paragraph is a promise from the Artist to the Buyer that
                the Work in the NFT does not belong to a third party and that
                Buyer won’t be subject to claims from a 3rd party by
                buying/selling the NFT.
              </p>
            </InlineEducationPoint>
            <p>
              <Section>3.2</Section> Artist further represents and warrants that
              the code in the actual NFT, commonly known as the "smart
              contract," will, to the extent applicable, be consistent with what
              the parties have agreed to in this agreement.
            </p>
            <InlineEducationPoint>
              <p>
                This paragraph states that the actual computer code (smart
                contract) that creates the NFT will have the same terms as what
                is agreed to in this contract.
              </p>
            </InlineEducationPoint>
            <p>
              <Section>3.3</Section> Buyer represents and warrants that they
              will not use the NFT outside of the rights granted herein.
            </p>
            <InlineEducationPoint>
              <p>
                This requires the buyer to agree that they won’t use the NFT in
                any manner that they don’t have the rights for.
              </p>
            </InlineEducationPoint>
            <p>
              <Section>3.4</Section> Buyer represents and warrants that they
              will not use the NFT or Artist's name, image, or likeness in any
              manner that is disparaging, misleading, or likely to cause Artist
              public embarrassment, humiliation, or ridicule, or in any manner
              that would reasonably be viewed to constitute an endorsement by
              Artist of any third party product or service.
            </p>
            <p>
              <Section>3.5</Section> This Agreement constitutes the entire and
              only agreement and understanding between the parties concerning
              the subject matter hereof and all other prior negotiations,
              agreements, representations and understandings, whether oral or
              written (other than the terms and conditions of any applicable
              Platform where the NFT is exchanged), are superseded hereby.
            </p>
            <InlineEducationPoint>
              <h3>Other Agreements</h3>
              <p>
                This language means that, at the time the contract is being
                filled out, there are no other agreements that might affect what
                is agreed to here. (i.e. if you spoke on the phone about a
                different arrangement, what is on this paper controls anyway.)
                After the contract has been used, it is possible that other
                agreements or terms of service will supersede some of the terms
                of the contract.
              </p>
              <h3>
                Platform Agreements and how they might supersede our contracts
              </h3>
              <p>
                This project and the related contract template tool provide a
                means for individuals launching NFT projects to produce a legal
                agreement delineating terms between the artist(s) who created
                the content underlying a given NFT (i.e. the composition, master
                recording & visual art) and the NFT purchaser, and future
                purchaser(s) of a given NFT. However, it is important to note
                that this agreement only represents one legal relationship
                involved in the listing and sale of an NFT on a public
                marketplace. In addition to the artist-purchaser contract, NFTs
                that are listed for sale on public NFT platforms (for instance,
                on Open Sea, Catalog, or similar) may also be governed by
                contracts or legal terms of service between the artist(s) and
                the NFT sales platform itself. Likewise, if an artist were to
                launch their own portal for minting NFTs, the terms of service
                that they produce for the site might also impact the underlying
                legal terms of any NFTs minted on site, as they are effectively
                creating their own NFT sales platform. Ideally, these
                artist-platform contracts or terms of service would be directly
                referenced or attached as an appendix to the artist-NFT
                purchaser contract, however, this is not yet standard practice.
              </p>
              <p>
                Artists and prospective NFT purchasers should be aware of these
                additional legal agreements, and understand how they might
                interact, supersede or support the terms established in the
                artist-NFT purchaser contract. Currently, there are no clear
                guidelines or standard practices as to how multiple,
                concurrently enforceable agreements underlying NFTs and their
                sales should relate to each other. For instance, if an
                artist-purchaser contract conflicts with an artist-platform
                contract with respect to right assignments or the details
                therein (length of license(s); terms of remuneration; etc.), it
                is up to the individual details of the contracts in a given
                situation to determine which terms take precedence. As such, we
                recommend retaining a lawyer to help parse the full terms of all
                of the legal agreements underlying a given NFT project and
                understand any overlapping implications.
              </p>
            </InlineEducationPoint>
            <p>
              <Section>3.6</Section> This Agreement is binding upon and shall
              inure to the benefit of the respective successors and/or assigns
              of the parties hereto.
            </p>
            <InlineEducationPoint>
              <p>
                The terms of this Agreement don’t just apply to Artist and
                Buyer, they also carry forward to whoever owns the NFT in the
                future assuming it is not in conflict with the terms and
                conditions of subsequent marketplaces and platforms.
              </p>
            </InlineEducationPoint>
          </div>
        )}
        {Number(cqid) > 33 && (
          <div>
            <SectionTitle>4.0 - TRANSFERS</SectionTitle>
            <p>
              <Section>4.1</Section> All subsequent transactions of the NFT are
              subject to the following terms: (i) the NFT transferee (the
              "Transferee") shall, by purchasing, accepting, accessing or
              otherwise using the NFT be deemed to accept all of the terms of
              this Agreement as a "Buyer" hereof; (ii) you (the "Transferor")
              shall provide notice to the Transferee of this Agreement,
              including a link or other method by which the terms of this
              Agreement can be accessible by the Transferee; and (iii) Artist
              and shall be entitled to receive an aggregate of{" "}
              <SEmbed r={r} id="33" />
              (%) percent of the gross amounts paid by the Transferee as set
              forth in the on-chain metadata associated with the NFT. Artist
              shall be paid on the same terms and at the same time as Transferor
              is paid by the Transferee. You acknowledge and agree that the
              amounts payable to Artist under this Section herein does not
              include, and is not intended to cover any additional fees,
              including Gas Fees imposed or required by the transferring
              platform through which you transfer the NFT.
            </p>
            <InlineEducationPoint>
              <p>
                “Gas Fees” fund the network of computers (nodes) that run a
                decentralized blockchain network. This means that the buyer will
                pay a Gas Fee for each transaction that occurs via a
                decentralized blockchain network,{" "}
                <strong>including the purchase of the NFT</strong>. Artist has
                no insight into or control over these payments or transactions,
                nor does Artist have the ability to reverse any transactions.
                Accordingly, Artist will have no liability to you or to any
                third party for any claims or damages that may arise as a result
                of any transactions of the NFT that you engage in.
              </p>
            </InlineEducationPoint>
            <Subparagraph>
              <Section>4.1.1</Section> Buyer further acknowledges and agrees
              that all subsequent transactions of the NFT will be effected on
              the blockchain network governing the NFT, and Buyer will be
              required to make or receive payments exclusively through its
              Wallet.
            </Subparagraph>
          </div>
        )}
        {Number(cqid) > 34 && (
          <div>
            <SectionTitle>5.0 - JURISDICTION</SectionTitle>
            <p>
              This Agreement shall be construed and enforced in accordance with
              the laws of the United States of America and of the State of{" "}
              <SEmbed r={r} id="34" />
            </p>
            <InlineEducationPoint>
              <p>
                Each state in the United States as well as every country has its
                own laws. A contract needs to mention which laws apply to it.
                This contract is limited to the laws of the United States
                because we are not experts in foreign intellectual property law.
                If you are, please get in touch to help us with this project.
              </p>
            </InlineEducationPoint>
            <SectionTitle>6.0 - TAXES</SectionTitle>
            <p>
              Buyer is solely responsible for all applicable federal, state,
              provincial, and local taxes arising from any fees or compensation
              Buyer receives from any secondary sale of the NFT.
            </p>
            <SectionTitle>7.0 - ARBITRATION</SectionTitle>
            <p>
              If there is a disagreement between Artist and Buyer concerning the
              interpretation of this Agreement, the parties shall use reasonable
              efforts to resolve their dispute directly prior to resorting to
              alternative legal remedies. In the event the parties are unable to
              resolve their dispute directly, any controversy or claim arising
              out of, or relating to, this Agreement shall be settled by
              arbitration conducted by the American Arbitration Association
              (AAA) under its Commercial Arbitration Rules (or such substitute
              provisions therefore then in effect). Any such arbitration shall
              be conducted in <SEmbed r={r} id="34" />. The arbitration of such
              issues, including the determination of the amount of any damages
              suffered by any party hereof by reason of the acts or omissions of
              another shall be to the exclusion of any court of law except as
              set forth below. The decision of the arbitrator shall be final and
              binding on all parties and their respective heirs, executors,
              administrators, successors, and assigns. Any action to secure a
              judicial confirmation of the arbitration award may be brought in
              any state or federal court of competent jurisdiction.
            </p>
            <InlineEducationPoint>
              <p>
                Since lawsuits are expensive, inefficient, and time consuming,
                oftentimes parties to a contract will agree to have any dispute
                settled by a neutral third party (“arbitrator”) instead. In the
                United States, the AAA sets ground rules and provides neutral
                arbitrators, and here the parties are agreeing to accept that
                system instead of going to court.
              </p>
            </InlineEducationPoint>
          </div>
        )}
        {Number(cqid) > 35 && (
          <div>
            <SectionTitle>8.0 - BREACH</SectionTitle>
            <p>
              In the event of breach or alleged breach of this Agreement by
              Artist, Buyer rights will be limited to those at law for money
              damages. In no event will Buyer have the right to seek or obtain
              injunctive or other equitable relief.
            </p>
            <p>
              Before either party can be deemed to be in breach of this
              Agreement the other party must give written notice and the party
              receiving that notice has 10 business days to "cure" the breach
              identified in that notice. All notices to Artist shall be sent to{" "}
              <SEmbed r={r} id="35" />.
            </p>
            <InlineEducationPoint>
              <p>
                No matter the case, the Buyer cannot prevent the Artist from
                performing, releasing other music, doing future NFT drops, or
                taking any other specific actions. Buyer’s only option is to ask
                for money to recover whatever was lost financially as a result
                of the breach of agreement.
              </p>
            </InlineEducationPoint>
            <SectionTitle>9.0 - INDEMNIFICATION</SectionTitle>
            <p>
              Artist and Buyer will indemnify, defend and hold harmless one
              another from and against any and all claims, causes of action,
              liabilities, damages, losses, costs and expenses arising out of or
              related to any alleged breach of any provision in this Agreement.
            </p>
            <InlineEducationPoint>
              <p>
                Indemnification means that one party won’t be responsible for
                something wrong that the other party does. In this contract, the
                artist won’t be legally responsible if the buyer screws up and
                visa versa. This is called a mutual indemnity clause because the
                protections go both ways.
              </p>
            </InlineEducationPoint>
            <SectionTitle>10.0 - MISCELLANEOUS</SectionTitle>
            <p>
              <Section>10.1</Section> By buying or selling the NFT, Buyer agrees
              to pay all applicable fees and, if applicable, Buyer authorizes
              Artist to automatically deduct fees (including any transaction
              fees, or so-called "Gas Fees", as applicable) directly from
              Buyer's payments for the transaction or subsequent transactions.
            </p>
            <p>
              <Section>10.2</Section> BUYER UNDERSTANDS AND ASSUMES THE RISKS
              INHERENT IN ANY BLOCKCHAIN TRANSACTION AND AGREES THAT ARTIST WILL
              NOT BE RESPONSIBLE OR LIABLE TO BUYER FOR ANY LOSS, AND TAKES NO
              RESPONSIBILITY FOR, AND WILL NOT BE LIABLE FOR, ANY IMPROPER USE
              OF THE NFT INCLUDING BUT NOT LIMITED TO ANY LOSSES, DAMAGES OR
              CLAIMS ARISING FROM: (I) USER ERROR SUCH AS FORGOTTEN PASSWORDS,
              INCORRECTLY CONSTRUCTED TRANSACTIONS, OR MISTYPED WALLET
              ADDRESSES; (II) SERVER FAILURE OR DATA LOSS; (III) CORRUPTED
              CRYPTOCURRENCY WALLET FILES; (IV)OR (V) ANY UNAUTHORIZED THIRD
              PARTY ACTIVITIES, INCLUDING WITHOUT LIMITATION THE USE OF VIRUSES,
              PHISHING, BRUTEFORCING OR OTHER MEANS OF ATTACK AGAINST THE
              BLOCKCHAIN NETWORK UNDERLYING THE NFT.
            </p>
            <InlineEducationPoint>
              <p>
                Buyer understands that NFTs are intangible digital assets. They
                exist only by virtue of the ownership record maintained in the
                applicable blockchain network. Any transfer of title that might
                occur in any unique digital asset occurs on the decentralized
                ledger within such blockchain network. Transfer of the NFT, when
                it takes place on the blockchain, does not convey the transfer
                of any other rights associated with the artwork unless otherwise
                mentioned in the contract.
              </p>
            </InlineEducationPoint>
          </div>
        )}
        {Number(cqid) > 21 && (Answer({ r, id: '21', desire: '0' }) || Answer({ r, id: '27', desire: '0' })) && (
          <SectionTitle>11.0 - OFF-CHAIN BENEFITS</SectionTitle>
        )}
        {Number(cqid) > 21 && Answer({ r, id: '21', desire: '0' }) && (
          <div>
            <Section>Off Chain Benefits That Resemble Merch or Other Collectibles</Section>
            {Number(cqid) > 22 && (
              <p>
                (a)	In addition to the NFT Rights, Artist hereby grants Buyer the 
                right to redeem or acquire the following gratis merchandise item(s){" "}
                <SEmbed r={r} id='22' /> (the “NFT Merchandise”):
              </p>
            )}
            {Number(cqid) > 23 && (
              <div>
                <p>
                  (b)	
                  <Subparagraph>
                    (i) In order to claim the NFT Merchandise, Buyer shall comply with 
                    the following instructions for how Buyer can redeem or acquire the NFT 
                    Merchandise (i.e. by having Buyer provide a mailing or email address, or 
                    having Buyer connect a wallet to a third party service, etc.):
                  </Subparagraph>
                </p>
                <Subparagraph>
                  (ii) {" "}
                  <SEmbed r={r} id='23' />
                </Subparagraph>
              </div>
            )}
            {Number(cqid) > 24 &&(
              <div>
                <Subparagraph>
                  (iii)	If not provided above, Artist shall clearly and conspicuously provide 
                  Claiming Instructions on Artist’s website or on the Platform where the NFT is 
                  listed for sale (“Claiming Instructions”). Buyer shall be responsible for 
                  fully complying with the Claiming Instructions and Artist shall have no 
                  liability as a result of Buyer’s failure to do so. In the event Buyer is unable 
                  to acquire or redeem the NFT Merchandise even after complying with the Claiming 
                  Instructions, Buyer’s sole remedy is to submit a notification to {" "}
                  <SEmbed r={r} id="24" /> so that Artist may use reasonable efforts to remedy the issue.
                </Subparagraph>
                {Number(cqid) > 26 && Answer({ r, id: '25', desire: '0' }) && (
                  <Subparagraph>
                    (iv)	If Buyer does not promptly comply with the Claiming Instructions, Buyer’s 
                    right to claim the  NFT Merchandise shall expire on {" "}
                    <SEmbed r={r} id='26' />
                  </Subparagraph>
                )}
                <p>
                  (c)
                  <Subparagraph>
                    (i)	The parties acknowledge and understand that future situations or changing 
                    circumstances that are outside Artist’s control may result in Artist being unable 
                    to deliver or provide the NFT Merchandise despite Buyer’s compliance with the original 
                    Claiming Instructions. In such an event, Artist may update this Agreement or the 
                    Claiming Instructions in its sole discretion, provided, however, that any such update 
                    must be intended primarily for the benefit of Buyer and also be reasonably likely to 
                    benefit Buyer (a “Claiming Update”). In the event of any Claiming Update by Artist, 
                    Artist will notify Buyer by updating the Claiming Instructions, amending this Agreement 
                    wherever it is posted, and/or use other generally accepted forms of communication. 
                    Buyer’s continued possession of the NFT after the posting of such Claiming Update 
                    constitutes Buyer’s acceptance and agreement to such update. If Buyer does not agree to 
                    be bound by such changes, Buyer may transfer or sell the NFT.
                  </Subparagraph>
                  <Subparagraph>
                    (ii)	Furthermore, Artist will not be liable or responsible to Buyer, nor be deemed to 
                    have defaulted under or breached this agreement, if Buyer is unable to redeem NFT 
                    Merchandise as a result of any events beyond Artist’s ability to control, including acts 
                    of God; flood, fire, earthquake, epidemics, pandemics, tsunami, explosion, war, invasion, 
                    hostilities, terrorist threats or acts, riot or other civil unrest, government order, law, 
                    or action, embargoes or blockades, strikes, labor stoppages or slowdowns or other 
                    industrial disturbances, shortage of adequate or suitable internet connectivity, 
                    telecommunication breakdown or shortage of adequate power or electricity, and other 
                    similar events beyond Artist’s control.
                  </Subparagraph>
                </p>
                <p>
                  (d) Buyer acknowledges and agrees that if the NFT has been purchased on a secondary market, 
                  the NFT Merchandise may have already been redeemed by the previous holder of the NFT. As 
                  between Buyer and Artist, Buyer is solely responsible for determining whether any NFT 
                  Merchandise that was originally included with the NFT can still be redeemed by complying 
                  with the Claiming Instructions. However, Artist shall use reasonable efforts to make such 
                  information readily available to the Buyer. For clarity, Artist shall have no liability by 
                  virtue of the fact that NFT Merchandise is no longer available to be redeemed.
                </p>
                <p>
                  (e) The parties agree that the value of NFT Merchandise is the standard retail value of 
                  such item (e.g., $.99 for an mp3 file of a song).
                </p>
              </div>
            )}
          </div>
        )}
        {Number(cqid) > 27 && Answer({ r, id: '27', desire: '0' }) && (
          <div>
            <Section>Off Chain Benefits That Grant Access to Exclusive Events, Fan Clubs, Etc.</Section>
            {Number(cqid) > 28 && (
              <div>
                <p>
                  (a)	In addition to the NFT Rights, Artist hereby grants Buyer the right attend 
                  certain events, participate in certain experiences, or gain access to exclusive 
                  fan clubs, online chat rooms, or other communities as more fully described below:
                </p>
                <p>
                  <SEmbed r={r} id='28' />
                </p>
                <p>
                  The foregoing is collectively referred to herein as the “NFT Access Rights”
                </p>
            </div>
            )}
            {Number(cqid) > 29 && (
              <div>
                <p>
                  (b)	
                  <Subparagraph>
                    (i) In order to claim the NFT Access Rights, Buyer shall comply with the 
                    following instructions for how Buyer can redeem or acquire the NFT Access 
                    Rights (i.e. by having Buyer provide a mailing or email address, or having 
                    Buyer connect a wallet to a third party service, etc.):
                  </Subparagraph>
                </p>
                <Subparagraph>
                  (ii) {" "}
                  <SEmbed r={r} id='29' />
                </Subparagraph>
              </div>
            )}
            {Number(cqid) > 30 &&(
              <div>
                <Subparagraph>
                  (iii)	If not provided above, Artist shall clearly and conspicuously provide 
                  Claiming Instructions on Artist’s website or on the Platform where the NFT 
                  is listed for sale (“Claiming Instructions”). Buyer shall be responsible for 
                  fully complying with the Claiming Instructions and Artist shall have no liability 
                  as a result of Buyer’s failure to do so. In the event Buyer is unable to acquire 
                  or redeem the NFT Access Rights even after complying with the Claiming Instructions, 
                  Buyer’s sole remedy is to submit a notification to {" "}
                  <SEmbed r={r} id="30" /> so that Artist may use reasonable efforts to remedy the issue.
                </Subparagraph>
                {Number(cqid) > 32 && Answer({ r, id: '31', desire: '0' }) && (
                  <Subparagraph>
                    (iv)	If Buyer does not promptly comply with the Claiming Instructions, Buyer’s 
                    right to claim the  NFT Merchandise shall expire on {" "}
                    <SEmbed r={r} id='32' />
                  </Subparagraph>
                )}
                <p>
                  (c)
                  <Subparagraph>
                    (i)	The parties acknowledge and agree that future situations or changing circumstances 
                    that are outside Artist’s control may result in Artist being unable to deliver or 
                    provide the NFT Access Rights despite Buyer’s compliance with the original Claiming 
                    Instructions. In such an event, Artist may update this Agreement or the Claiming 
                    Instructions in Artist’s sole discretion, provided, however, that any such update 
                    must be intended primarily for the benefit of Buyer and also be reasonably likely to 
                    benefit Buyer (a “Claiming Update”). In the event of any Claiming Update by Artist, 
                    Artist will notify Buyer by updating the Claiming Instructions, amending this Agreement 
                    wherever it is posted, and/or by using other generally accepted forms of communication. 
                    Buyer’s continued possession of the NFT after Artist’s posting of such Claiming Update 
                    constitutes Buyer’s acceptance and agreement to such update. If Buyer does not agree 
                    to be bound by such changes, Buyer may transfer or sell the NFT.
                  </Subparagraph>
                  <Subparagraph>
                    (ii)	Furthermore, Artist will not be liable or responsible to Buyer, nor be deemed to 
                    have defaulted under or breached this agreement, if Buyer is unable utilize the NFT 
                    Access Rights as a result of any events beyond Artist’s ability to control, including 
                    acts of God; flood, fire, earthquake, epidemics, pandemics, tsunami, explosion, war, 
                    invasion, hostilities, terrorist threats or acts, riot or other civil unrest, government 
                    order, law, or action, embargoes or blockades, strikes, labor stoppages or slowdowns or 
                    other industrial disturbances, shortage of adequate or suitable internet connectivity, 
                    telecommunication breakdown or shortage of adequate power or electricity, and other 
                    similar events beyond Artist’s control.
                  </Subparagraph>
                </p>
                <p>
                  (d)	Buyer acknowledges and agrees that if the NFT has been purchased on a secondary market, 
                  the NFT Access Rights may have already been redeemed by the previous holder of the NFT. As 
                  between Buyer and Artist, Buyer is solely responsible for determining whether any NFT Access 
                  Rights that were originally included with the NFT can still be redeemed by complying with 
                  the Claiming Instructions (or not). For clarity, Artist shall have no liability by virtue 
                  of the fact that NFT Access Rights are no longer available to be redeemed.
                </p>
                <p>
                  (e)	In connection with any NFT Access Rights granted to Buyer hereunder, Buyer agrees to 
                  conduct him/herself professionally, civilly and respectfully at all times and in no event 
                  will Buyer harass, solicit, stalk, maliciously target, or otherwise make hurtful, 
                  defamatory, or derogatory comments towards, or engage in malicious conduct against, any 
                  other person. Artist reserves the right to determine, in its sole discretion, what 
                  constitutes harassment, mischief, or unacceptable conduct with or towards other persons 
                  and where that has occurred, and may in its sole discretion, partially or completely deny, 
                  suspend or terminate NFT Access rights for any Buyer that it determines has engaged in such 
                  behavior. Additionally, Buyer shall comply with all rules, regulations, terms and conditions 
                  promulgated by third parties in connection with the NFT Access rights (e.g. the rules of any 
                  venue or event space or the terms and conditions of a Discord community).
                </p>
              </div>
            )}
          </div>
        )}
      </InnerElement>
    </ContractComponent>
  );
}

export default Contract;
