pragma solidity ^0.8.10;

import "./IERC721.sol";
import "./IERC721Receiver.sol";
import "./Ownable.sol";

contract kittyContract is IERC721, Ownable{
   uint256 public constant CREATION_LIMIT_GEN0 = 50;
   string public constant tokenSymbol = "CK";
   string public constant tokenName = "CodedKitties";

   bytes4 internal constant MAGIC_ERC721_RECEIVED = bytes4(keccak256("onERC721Received(address, address, uint256, bytes)"));
  
        bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;

        bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;

  event Birth(address owner, uint256 kittenId, uint256 mumId, uint256 dadId, uint256 genes);
   struct Kitty{
        uint256 genes;
        uint64 birthTime;
        uint32 mumId;
        uint32 dadId;
        uint16 generation;
    }
        
    Kitty[] kitties;

        mapping(address => uint256) ownershipTokenCount;
        mapping(uint256 => address) public kittyTokenOwner;
        mapping(uint256 => address) public kittyIndexToApproved;
        // MYADDR => OPERATORADDR =>TRUE/FALSE     
        mapping(address => mapping(address => bool)) private _operatorApprovals;

        uint256 public gen0Counter;


        function breed(uint256 _dadId, uint256 _mumId) public returns(uint256){
            // check ownership
            require(_owns(msg.sender, _dadId), "the user doesnt own this token");
             require(_owns(msg.sender, _mumId), "the user doesnt own this token");
            // you get the dna
            (uint256 dadDna,,,,uint256 DadGeneration) = getKitty(_dadId);
             (uint256 mumDna,,,,uint256 MumGeneration) = getKitty(_dadId);
              uint256 newDna = _mixDna(dadDna, mumDna);

            // figure out the generation
            uint256 kidGen = 0;
            if(DadGeneration < MumGeneration){
                kidGen = MumGeneration + 1;
                kidGen /= 2;
            }else if (DadGeneration > MumGeneration){
                  kidGen = DadGeneration + 1;
                kidGen /= 2;
            }else{
                kidGen = MumGeneration + 1;  
            }
            // create a new cat with the new properties, give it to the msg.sender
            _createKitty(_mumId, _dadId, kidGen, newDna, msg.sender);
              
        }

        function supportInterface(bytes4 _interfaceId) external view returns(bool){
            return(_interfaceId == _INTERFACE_ID_ERC721 || _interfaceId == _INTERFACE_ID_ERC165);
        }

         function safeTransferFrom(address _from, address _to, uint256 _tokenId) public{
             safeTransferFrom(_from, _to, _tokenId, "");
        }

        function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory _data) public{
           
           require(_isApprovedOwner(msg.sender, _from, _to, _tokenId));
            _safeTransfer(_from, _to, _tokenId, _data);
        }

       



        function _safeTransfer(address _from, address _to, uint256 _tokenId, bytes memory _data) internal{
            _transfer(_from, _to, _tokenId);
            require(_checkERC721Support(_from, _to, _tokenId, _data));
        }

         function approve(address _to, uint256 _tokenId) external{
             require(_owns(msg.sender, _tokenId));

             _approve(_tokenId, _to);

             emit Approval(msg.sender, _to, _tokenId);
         }

          function setApprovalForAll(address _operator, bool _approved) external{
              require(_operator != msg.sender);

              _operatorApprovals[msg.sender][_operator] = _approved;
              emit ApprovalForAll(msg.sender, _operator, _approved);
          }

         // a function for geting the approved status for a token
          function getApproved(uint256 _tokenId) external view returns (address){
              require(_tokenId < kitties.length); // token must exist;

              return kittyIndexToApproved[_tokenId];
          }

          function isApprovedForAll(address _owner, address _operator)public view returns (bool){
              return _operatorApprovals[_owner][_operator];
          }

         function transferFrom(address _from, address _to, uint256 _tokenId) external{
            require(_to != address(0));
            require(msg.sender == _from || _approvedFor(msg.sender, _tokenId) || isApprovedForAll(_from, msg.sender));
            require(_owns(_from, _tokenId));
            
            require(_tokenId < kitties.length);
             
             _transfer(_from, _to, _tokenId);
         }


        function getKitty(uint256 _id) public view returns(uint256 genes, uint256 birthTime, uint256 mumId, uint256 dadId, uint256 generation){
            Kitty storage kitty = kitties[_id];

            birthTime = uint256(kitty.birthTime);
            mumId = uint256(kitty.mumId);
            dadId = uint256(kitty.dadId);
            generation = uint256(kitty.generation);
            genes = kitty.genes;
        }


        function createKittyGen0(uint256 _genes) public isOwner returns(uint256){
            require(gen0Counter < CREATION_LIMIT_GEN0, "creation limit reached");

            gen0Counter++;

            // Gen0 have no owners they are own by the contract
            return _createKitty(0, 0, 0, _genes, msg.sender);
        }

    function _createKitty(uint _mumId, uint256 _dadId, uint256 _generation, uint256 _genes, address _owner)private returns(uint256) {
        Kitty memory _kitty = Kitty({
            genes: _genes,
            birthTime: uint64(block.timestamp),
            mumId: uint32(_mumId),
            dadId: uint32(_dadId),
            generation: uint16(_generation)
        });

        
        // uint256 newKittenId = kitties.push(_kitty) -1;
        
        kitties.push(_kitty);

        uint256 newKittenId = kitties.length -1;


        emit Birth(_owner, newKittenId, _mumId , _dadId, _genes);

        _transfer(address(0), _owner, newKittenId);
    }  

    function balanceOf(address owner) external view returns (uint256){
            return ownershipTokenCount[owner];
    }

    function totalSupply() external view returns (uint256){
        return kitties.length;
    }

     function name() external pure returns (string memory){
         return tokenName;
     }

     function symbol() external pure returns (string memory ){
         return tokenSymbol;
     }

     function ownerOf(uint256 tokenId) external view returns (address ){
          require(kittyTokenOwner[tokenId] != address(0));
           return kittyTokenOwner[tokenId];
   }

   function transfer(address to, uint256 tokenId) external{

       require(to != address(0));
       require(to != address(this));
    
    _transfer(msg.sender, to, tokenId);
   }

   function _transfer(address _from, address _to, uint256 _tokenId) internal{
       ownershipTokenCount[_to]++;

       kittyTokenOwner[_tokenId] = _to;

       if(_from != address(0)) {
           ownershipTokenCount[_from]--;
           delete kittyIndexToApproved[_tokenId];
       }

    //    emit transfer event

    emit Transfer(_from, _to, _tokenId);  

   }

    function _owns(address _claimant, uint256 _tokenId) internal view returns(bool){
            return kittyTokenOwner[_tokenId] == _claimant;
     }


        function _approve(uint256 _tokenId, address _approved) internal{
            kittyIndexToApproved[_tokenId] = _approved;
        }

        function _approvedFor(address _claimant, uint256 _tokenId)internal view returns(bool){
            return kittyIndexToApproved[_tokenId] == _claimant;
        }
        function _checkERC721Support(address _from, address _to, uint256 _tokenId, bytes memory _data) internal returns(bool){
            if(!_isContract(_to)){
                return true;
            }
             // Call onErC721Recieved in the _to contract
            bytes4 returnData = IERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data);
            return returnData == MAGIC_ERC721_RECEIVED;

            // Check return value
        }

        function _isContract(address _to) view internal returns(bool){
            uint32 size;
            assembly{
                size := extcodesize(_to)
            }
            return size > 0;
        }

        function _isApprovedOwner(address _spender, address _from, address _to, uint256 _tokenId)internal view returns(bool){
            require(_to != address(0));
            require(_owns(_from, _tokenId));
            require(_tokenId < kitties.length);
            return(_spender == _from || _approvedFor(_spender, _tokenId) || isApprovedForAll(_from, _spender));
          

        }

        function _mixDna(uint256 _dadDna, uint256 _mumDna) internal returns(uint256){
            //dad: 11 22 33 44 55 66 77 88
            //mum: 88 77 66 55 44 3 22 11

            uint256 firstHalf = _dadDna / 100000000;
            uint256 secondHalf = _mumDna % 100000000;

            uint256 newDna = firstHalf * 100000000 ;
            newDna = newDna + secondHalf;
            return newDna;
        }

}

