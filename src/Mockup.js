class Mockup {
	/* helper class for mockup objects */

	constructor(mockupGroupID, color, mockupType, imageFile, aiFile, imageFileBack, aiFileBack) {
		this.mockupGroupID = mockupGroupID;
		this.color = color;
		this.mockupType = mockupType;
		this.imageFile = imageFile;
		this.aiFile = aiFile;
		this.imageFileBack = imageFileBack;
		this.aiFileBack = aiFileBack;

		return this;
	}

}

export default Mockup;
